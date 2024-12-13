import './Filter.css';
import React from 'react';
import ReactDOM from 'react-dom';
import emeraldImg from '../../assets/img/emerald.png';
import rubyImg from '../../assets/img/ruby.png';
import diamondImg from '../../assets/img/diamond.png';
import loadingImg from '../../assets/img/loading.svg';
import { useEffect, useState, useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@material-ui/core/';
import { database } from '../../helpers/firebase.js';
import { NotificationManager } from 'react-notifications';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context';
import watchlistImg from '../../assets/img/watchlisted.png';
import nonwatchlistImg from '../../assets/img/nonwatchlisted.png';
import axios from 'axios';
import { ENVS } from '../../helpers/configurations';
import { ethers } from 'ethers';

export const Filter = (props) => {
  const [load, setLoaded] = useState(0);
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState({});

  const { walletAddress, synchroTables, handleSynchroTables } = useContext(AppContext);

  const [filterOption, setFilterOption] = useState(0);
  const [allShowData, setAllShowData] = useState([]);

  const [openWatchListDlg, setWatchListDlg] = useState(false);

  const [rowId, setRowId] = useState('');
  const [wlDlgTitle, setWlDlgTitle] = useState('');

  const [diamondSelected, setDiamondSelected] = useState(false);
  const [rubySelected, setRubySelected] = useState(false);
  const [emeraldSelected, setEmeraldSelected] = useState(false);
  const [networkSelected, setNetworkSelected] = useState(0);
  const [categorySelected, setCategorySelected] = useState(0);
  const [showNetworkSubFilter, setShowNetworkSubFilter] = useState('none');
  const [showCategorySubFilter, setShowCategorySubFilter] = useState('none');

  const [ethSelected, setEthSelected] = useState(false);
  const [bscSelected, setBSCSelected] = useState(false);

  const [networkTitle, setNetworkTitle] = useState('Network');
  const [categoryTitle, setCategoryTitle] = useState('Category');

  const navigate = useNavigate();

  useEffect(() => {}, [
    showCategorySubFilter,
    showNetworkSubFilter,
    synchroTables,
    diamondSelected,
    rubySelected,
    emeraldSelected,
    networkTitle,
    categoryTitle,
  ]);

  useEffect(() => {
    setLoading(true);

    setAllData({});
    const dbRef = database.ref('/coinlist');
    dbRef.orderByChild('listed').on('value', (snapshot) => {
      if (snapshot.exists()) {
        setAllData(snapshot.val());
        setAllShowDataFunc(allData);
        setLoaded(1);
        setLoading(false);
      } else {
        setAllData({});
        setAllShowData([]);
        setLoading(false);
      }
    });
  }, [load, rowId, walletAddress, synchroTables]);

  useEffect(() => {
    setLoading(true);
    setAllData({});
    let dbRef = database.ref('/coinlist');
    if (categorySelected) {
      switch (filterOption) {
        case 6:
          // console.log("Today listed");
          let epochNow = Math.floor(Date.now() / 1000);
          dbRef
            .orderByChild('listed')
            .startAt(Math.floor(epochNow / 86400) * 86400)
            .on('value', (snapshot) => {
              if (snapshot.exists()) {
                setAllData(snapshot.val());
                setAllShowDataFunc(snapshot.val());
              } else {
                setAllData({});
                setAllShowData([]);
              }
            });
          break;
        case 7:
          // console.log("Today Best");
          dbRef
            .orderByChild('dailyCount')
            .limitToFirst(5)
            .on('value', (snapshot) => {
              if (snapshot.exists()) {
                setAllData(snapshot.val());
                setAllShowDataFunc(snapshot.val());
              } else {
                setAllData({});
                setAllShowData([]);
              }
            });
          break;
        case 8:
          // console.log("Presale");
          dbRef
            .orderByChild('presale')
            .equalTo(true)
            .on('value', (snapshot) => {
              if (snapshot.exists()) {
                setAllData(snapshot.val());
                setAllShowDataFunc(snapshot.val());
              } else {
                setAllData({});
                setAllShowData([]);
              }
            });
          break;
        case 9:
          // console.log("All time best");
          dbRef
            .orderByChild('voteCount')
            .limitToFirst(5)
            .on('value', (snapshot) => {
              if (snapshot.exists()) {
                setAllData(snapshot.val());
                setAllShowDataFunc(snapshot.val());
              } else {
                setAllData({});
                setAllShowData([]);
              }
            });
          break;
        default:
          break;
      }
    } else {
      const dbRef = database.ref('/coinlist');
      dbRef.orderByChild('listed').on('value', (snapshot) => {
        if (snapshot.exists()) {
          setAllData(snapshot.val());
          setAllShowDataFunc(allData);
        } else {
          setAllData({});
          setAllShowData([]);
        }
      });
    }

    setLoading(false);
  }, [
    load,
    synchroTables,
    diamondSelected,
    rubySelected,
    emeraldSelected,
    ethSelected,
    bscSelected,
    filterOption,
  ]);

  const setAllShowDataFunc = async (data) => {
    let wlImg = '';
    let tempData = [];
    // console.log(data, "data");
    for (let i in data) {
      if (diamondSelected) {
        if (data[i].voteCount < ENVS.DIAMOND_TIRE_LIMIT) continue;
      } else if (rubySelected) {
        if (
          data[i].voteCount < ENVS.RUBY_TIRE_LIMIT ||
          data[i].voteCount >= ENVS.DIAMOND_TIRE_LIMIT
        )
          continue;
      } else if (emeraldSelected) {
        if (data[i].voteCount >= ENVS.RUBY_TIRE_LIMIT) continue;
      }

      if (networkSelected && bscSelected) {
        if (data[i].network !== 'BSC') continue;
      } else if (networkSelected && ethSelected) {
        if (data[i].network !== 'ETH') continue;
      }
      wlImg = nonwatchlistImg;

      let wlList = data[i].watchlist;
      if (wlList?.includes(walletAddress)) {
        wlImg = watchlistImg;
      }

      let tierImg = emeraldImg;
      if (data[i].voteCount >= ENVS.DIAMOND_TIRE_LIMIT) {
        tierImg = diamondImg;
      } else if (data[i].voteCount >= ENVS.RUBY_TIRE_LIMIT) {
        tierImg = rubyImg;
      }

      let mcap, change24h;
      if (data[i].presale === true) {
        mcap = 'Presale';
        change24h = '-';
      } else {
        let qs = `?symbol=${data[i].symbol}&convert=USD`;
        let res = await axios.get(
          'https://agile-cove-74302.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest' +
            qs,
          {
            headers: { 'X-CMC_PRO_API_KEY': 'a8dd2502-9e7c-4bf6-8cd2-29d2829e042a' },
          }
        );

        let tempSymbol = data[i].symbol;
        mcap = res.data.data[tempSymbol]?.quote.USD.market_cap;
        change24h = res.data.data[tempSymbol]?.quote.USD.percent_change_24h;
      }

      tempData.push([
        data[i].logo,
        data[i].name,
        data[i].network,
        isNaN(mcap) ? mcap : floorValue(mcap),
        isNaN(change24h) ? change24h : floorValue(change24h),
        convertLaunchDate(data[i].launch),
        tierImg,
        data[i].voteCount,
        '',
        wlImg,
        i,
      ]);
    }
    setAllShowData(tempData);
  };

  const floorValue = (value) => {
    if (value > 1000000000) {
      return Math.floor((value / 1000000000) * 100) / 100 + ' B';
    } else if (value > 1000000) {
      return Math.floor((value / 1000000) * 100) / 100 + ' M';
    } else if (value > 1000) {
      return (Math.floor((value / 1000) * 100) / 100).toString + ' K';
    } else {
      return Math.floor(value * 100) / 100;
    }
  };

  const diamondFilterClicked = () => {
    if (diamondSelected) {
      setDiamondSelected(false);
    } else {
      setDiamondSelected(true);
      setRubySelected(false);
      setEmeraldSelected(false);
    }
  };
  const rubyFilterClicked = () => {
    if (rubySelected) {
      setRubySelected(false);
    } else {
      setDiamondSelected(false);
      setRubySelected(true);
      setEmeraldSelected(false);
    }
  };
  const emeraldFilterClicked = () => {
    if (emeraldSelected) {
      setEmeraldSelected(false);
    } else {
      setDiamondSelected(false);
      setRubySelected(false);
      setEmeraldSelected(true);
    }
  };
  const ethNetworkFilterClicked = () => {
    setNetworkTitle('ETH');
    setNetworkSelected(true);
    setEthSelected(true);
    setBSCSelected(false);
  };
  const bscNetworkFilterClicked = () => {
    setNetworkTitle('BSC');
    setNetworkSelected(true);
    setBSCSelected(true);
    setEthSelected(false);
  };

  const todayListedClicked = () => {
    setCategoryTitle('Today listed');
    setCategorySelected(true);
    setFilterOption(6);
  };
  const todayTopVoteClicked = () => {
    setCategoryTitle('Today Best');
    setCategorySelected(true);
    setFilterOption(7);
  };
  const presaleClicked = () => {
    setCategoryTitle('Presale');
    setCategorySelected(true);
    setFilterOption(8);
  };

  const topVoteClicked = () => {
    setCategoryTitle('All time best');
    setCategorySelected(true);
    setFilterOption(9);
  };

  const handleOpenWatchListDlg = (id) => {
    let wllist = allData[id].watchlist;

    if (wllist.includes(walletAddress)) {
      setWlDlgTitle('You are going to remove this project from your Watchlist?');
    } else {
      setWlDlgTitle('You are going to add this project to your Watchlist?');
    }
    setRowId(id);
    setWatchListDlg(true);
  };

  const handleCloseWatchListDlg = () => {
    setWatchListDlg(false);
  };

  const convertLaunchDate = (epoch) => {
    let dateDiff = 0;
    let monthDiff = 0;
    let yearDiff = 0;

    let countNow = Math.floor(Math.floor(Date.now() / 1000) / 86400);
    let launchDate = Math.floor(epoch / 86400);

    if (countNow > launchDate) {
      dateDiff = countNow - launchDate;
      if (countNow - launchDate > 365) {
        yearDiff = Math.floor(dateDiff / 365);
        return yearDiff.toString() + ' Year Ago';
      } else if (dateDiff > 30) {
        monthDiff = Math.floor(dateDiff / 30);
        return monthDiff.toString() + ' Mon Ago';
      } else {
        dateDiff = countNow - launchDate;
        return dateDiff.toString() + ' Day Ago';
      }
    } else if (countNow < launchDate) {
      dateDiff = launchDate - countNow;
      if (dateDiff > 365) {
        yearDiff = Math.floor(dateDiff / 365);
        return 'In ' + yearDiff.toString() + ' Year';
      } else if (dateDiff > 30) {
        monthDiff = Math.floor(dateDiff / 30);
        return 'In ' + monthDiff.toString() + ' Mon';
      } else {
        return 'In ' + dateDiff.toString() + ' Day';
      }
    } else {
      return 'Today';
    }
  };

  const onRowClick = (rowData, rowMeta, e) => {
    if (e.target.type === 'submit' || e.target.type === 'number') {
      return;
    } else {
      navigate('/details/' + rowData[10], { replace: true });
    }
  };

  const wlBtnClicked = () => {
    if (walletAddress === '') {
      NotificationManager.error('You have to connect wallet first');
      return;
    }

    handleCloseWatchListDlg();

    let wllist = allData[rowId].watchlist;
    if (wllist.includes(walletAddress)) {
      let db = database.ref('/coinlist/' + rowId);
      db.update({ watchlist: wllist.replace(walletAddress + ',', '') })
        .catch((e) => {
          NotificationManager.error('Can not add.');
          console.log(e);
        })
        .then(() => {
          NotificationManager.success('Removed successfully.');
          // setLoaded(load + 1);
          handleSynchroTables(synchroTables + 1);
        });
    } else {
      let db = database.ref('/coinlist/' + rowId);
      db.update({ watchlist: allData[rowId].watchlist + walletAddress + ',' })
        .catch((e) => {
          NotificationManager.error('Can not add.');
          console.log(e);
        })
        .then(() => {
          NotificationManager.success('Added successfully.');
          // setLoaded(load + 1);
          handleSynchroTables(synchroTables + 1);
        });
    }
  };

  const voteClicked = async (id) => {
    let dbRef = database.ref('/votelimit');
    let dailyStart = 0;
    let dailyCount = 0;
    let epochNow = Math.floor(Date.now() / 1000);
    let tempId = '';
    let ret_val = false;
    dbRef
      .orderByChild('wallet')
      .equalTo(walletAddress)
      .on('value', (snapshot) => {
        // wallet exists
        if (snapshot.exists()) {
          // console.log("wallet exists already in vote limit table");
          let tempRow = snapshot.val();

          for (let i in tempRow) {
            // i = asdfawefawefx  => example
            tempId = i;
            dailyStart = tempRow[i].dailyStart;
            dailyCount = tempRow[i].dailyCount;
          }

          console.log(dailyCount, 'daily count');
          if (dailyCount >= 5 && epochNow - dailyStart <= 24 * 60 * 60) {
            NotificationManager.error('You can only vote 5 times per day.');
            ret_val = true;
          }
        }
      });
    if (ret_val) return;
    const infuraProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = infuraProvider.getSigner();

    const tx = {
      from: walletAddress,
      to: ENVS.CHARITY_ADDR,
      value: ethers.utils.parseUnits(ENVS.NORMAL_VOTE_FEE),
    };

    await signer
      .sendTransaction(tx)
      .then(async () => {
        if (tempId === '') {
          dbRef.push({
            wallet: walletAddress,
            dailyStart: Math.floor(epochNow / 86400) * 86400,
            dailyCount: dailyCount + 1,
          });
        } else {
          let dbRefUpdate = database.ref('/votelimit/' + tempId);
          dbRefUpdate.update({ dailyCount: dailyCount + 1 });
        }

        let db = database.ref('/coinlist/' + id);

        let updateDailyCount = 0;
        let updateDailyStart = 0;

        let updateWeeklyCount = 0;
        let updateWeeklyStart = 0;

        let epochNowDay = Math.floor(epochNow / 86400) * 86400;
        if (epochNowDay - Number(allData[id].updateWeeklyStart) > 86400 * 7) {
          updateWeeklyCount = 1;
          let getDayCount = Math.floor(epochNow / 86400) % 7;
          switch (getDayCount) {
            case 0:
              updateWeeklyStart = (Math.floor(epochNow / 86400) - 3) * 86400;
              break;
            case 1:
              updateWeeklyStart = (Math.floor(epochNow / 86400) - 4) * 86400;
              break;
            case 2:
              updateWeeklyStart = (Math.floor(epochNow / 86400) - 5) * 86400;
              break;
            case 3:
              updateWeeklyStart = (Math.floor(epochNow / 86400) - 6) * 86400;
              break;
            case 4:
              updateWeeklyStart = (Math.floor(epochNow / 86400) - 0) * 86400;
              break;
            case 5:
              updateWeeklyStart = (Math.floor(epochNow / 86400) - 1) * 86400;
              break;
            case 6:
              updateWeeklyStart = (Math.floor(epochNow / 86400) - 2) * 86400;
              break;
            default:
              updateWeeklyStart = 0;
              break;
          }
        } else {
          updateWeeklyStart = allData[id].weeklyStart;
          updateWeeklyCount = allData[id].weeklyCount + 1;
        }

        if (epochNow - Number(allData[id].dailyStart) < 86400) {
          updateDailyCount = Number(allData[id].dailyCount) + 1;
          updateDailyStart = Number(allData[id].dailyStart);
        } else {
          updateDailyCount = 1;
          updateDailyStart = Math.floor(epochNow / 86400) * 86400;
        }

        db.update({
          voteCount: Number(allData[id].voteCount) + 1,
          dailyStart: updateDailyStart,
          dailyCount: updateDailyCount,
          weeklyStart: updateWeeklyStart,
          weeklyCount: updateWeeklyCount,
        });

        if (
          Number(allData[id].voteCount) < ENVS.DIAMOND_TIRE_LIMIT &&
          Number(allData[id].voteCount) + 1 >= ENVS.DIAMOND_TIRE_LIMIT
        ) {
          await fetch(`${process.env.REACT_APP_SERVER_URL}/diamond/?token=${allData[id].name}`, {
            method: 'GET',
          })
            .then(() => {
              NotificationManager.info('Notification about Diamond Tier has sent to TG channel.');
            })
            .catch((err) => console.log(err));
        } else if (
          Number(allData[id].voteCount) < ENVS.RUBY_TIRE_LIMIT &&
          Number(allData[id].voteCount) + 1 >= ENVS.RUBY_TIRE_LIMIT
        ) {
          await fetch(`${process.env.REACT_APP_SERVER_URL}/ruby/?token=${allData[id].name}`, {
            method: 'GET',
          })
            .then(() => {
              NotificationManager.info('Notification about Ruby has sent to TG channel.');
            })
            .catch((err) => console.log(err));
        } else {
        }
      })
      .catch((e) => {
        NotificationManager.error('Transaction failed.');
        console.log(e);
      });

    handleSynchroTables(synchroTables + 1);
    setLoaded(load + 1);
  };

  const columns = [
    {
      name: 'Logo',
      options: {
        customBodyRender: (value) => {
          return (
            <div className="logoImgDiv">
              <img src={value} alt="" />
            </div>
          );
        },
      },
    },
    {
      name: 'Name',
      options: {
        setCellProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            backgroundColor: '#290825',
            left: '0',
            zIndex: 100,
          },
        }),
      },
    },
    'Chain',
    'MCAP',
    {
      name: 'Change 24h',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          // console.log(value, "bbbbbbb");
          let val = tableMeta.rowData[4];
          if (isNaN(val)) {
            return (
              <div className="change24hDiv" style={{ color: 'white' }}>
                <span>{val}</span>
              </div>
            );
          } else if (val < 0) {
            val = 0 - val;
            return (
              <div className="change24hDiv" style={{ color: 'yellow' }}>
                <span>{'- ' + val + ' %'}</span>
              </div>
            );
          } else {
            return (
              <div className="change24hDiv" style={{ color: 'green' }}>
                <span>{'+ ' + tableMeta.rowData[4] + ' %'}</span>
              </div>
            );
          }
        },
      },
    },
    'Launch',
    {
      name: 'Tier',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="tierImgDiv">
              <img src={tableMeta.rowData[6]} alt="" />
            </div>
          );
        },
      },
    },
    'Vote Counts',
    {
      name: '',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="voteBtnDiv">
              <Dialog
                open={openWatchListDlg}
                onClose={handleCloseWatchListDlg}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{wlDlgTitle}</DialogTitle>
                <DialogActions>
                  <Button type="submit" onClick={wlBtnClicked} autoFocus>
                    Yes
                  </Button>
                  <Button type="submit" onClick={handleCloseWatchListDlg}>
                    No
                  </Button>
                </DialogActions>
              </Dialog>

              <div className="voteBtnWrapped">
                <button className="voteBtn" onClick={() => voteClicked(tableMeta.rowData[10])}>
                  VOTE
                </button>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: 'WatchListed',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="wlImgDiv">
              {/* <img className="wlImg"  src={tableMeta.rowData[7]} onClick={()=> handleOpenWatchListDlg(tableMeta.rowData[8])}></img> */}
              <button
                style={{
                  backgroundImage: `url(${tableMeta.rowData[9]})`,
                  width: '40px',
                  height: '40px',
                  backgroundSize: 'contain',
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
                onClick={() => handleOpenWatchListDlg(tableMeta.rowData[10])}
              ></button>
            </div>
          );
        },
      },
    },
    {
      name: 'Hidden',
      options: {
        display: 'false',
      },
    },
  ];

  const options = {
    filter: false,
    // filterType: "dropdown",
    // responsive: "vertical",
    responsive: 'standard',
    rowHover: true,
    tableBodyMaxHeight: '100%',
    selectableRows: 'none',
    viewColumns: false,
    onRowClick: onRowClick,
  };

  // const epochToDate = (epoch) => {
  //     return moment.unix(epoch).format('YYYY/MM/DD');
  // }

  const networkFilterClicked = () => {
    if (networkSelected === true) {
      setNetworkSelected(false);
      setEthSelected(false);
      setBSCSelected(false);
      setNetworkTitle('Network');
    }
  };

  const networkMouseEntered = (flag) => {
    if (flag === true) {
      setShowNetworkSubFilter('block');
    } else {
      setShowNetworkSubFilter('none');
    }
  };

  const categoryFilterClicked = () => {
    if (categorySelected === true) {
      setCategorySelected(false);
      setFilterOption(0);
      setCategoryTitle('Category');
    }
  };

  const categoryMouseEntered = (flag) => {
    if (flag === true) {
      setShowCategorySubFilter('block');
    } else {
      setShowCategorySubFilter('none');
    }
  };
  const getMuiThemeForFilter = () =>
    createTheme({
      overrides: {
        MuiTableCell: {
          body: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: '20px',

            // borderColor: "#669999"
          },
          root: {
            textAlign: 'center',
            // borderColor: "#669999",
          },
        },
        MUIDataTableBodyRow: {
          root: {
            backgroundColor: '#290825',
            color: 'white',
            // borderColor:"#669999",
            '&:hover': {
              backgroundColor: '#669999 !important',
            },
            height: '30px',
          },
        },
        MUIDataTableBodyCell: {
          root: {
            textAlign: 'center',
          },
        },
        MUIDataTableFooter: {
          root: {
            backgroundColor: '#290825',
            color: 'white',
            // borderColor:"#669999"
          },
        },
        MUIDataTableFilter: {
          root: {
            backgroundColor: '#669999',
          },
        },

        MUIDataTable: {
          paper: {
            width: '99%',
            // borderColor: "#290825",
            color: 'white',
          },
        },
        MUIDataTableToolbar: {
          root: {
            backgroundColor: '#290825',
          },
        },
        MUIDataTableHeadCell: {
          fixedHeader: {
            backgroundColor: '#290825',
            color: 'white',
            alignContent: 'center',
          },
          data: {
            color: 'white',
          },
          sortActive: {
            color: 'white',
            alignItems: 'center !important',
          },
          sortAction: {
            alignItems: 'center',
            justifyContent: 'center',
          },
          contentWrapper: {
            justifyContent: 'center',
            textAlign: 'center',
          },
        },
        MuiSvgIcon: {
          root: {
            color: 'white',
          },
        },
        MUIDataTableSearch: {
          searchIcon: {
            color: 'white',
          },
          searchText: {
            color: 'white',
          },
        },
        // MuiInput: {
        // root:{
        //     color: "green"
        // },input:{
        //     color:"green"
        // }
        // },
        // MuiButton: {
        // root:{
        //     alignItems:"center",
        //      color: "blue"
        // },
        // textPrimary:{
        //     color: "blue"
        // }
        // },
        MuiTableSortLabel: {
          root: {
            color: 'white !important',
          },
          active: {
            color: 'white !important',
          },
          icon: {
            color: 'white !important',
          },
          iconDirectionAsc: {
            color: 'white !important',
          },
          iconDirectionDesc: {
            color: 'white !important',
          },
        },
        MuiTablePagination: {
          root: {
            color: 'white',
          },
        },
        MuiSelect: {
          icon: {
            color: 'white',
          },
          root: {
            color: 'white',
          },
        },
        // , MuiPaper:
        // {
        //     root:{
        //         backgroundColor:"#1e7981"
        //     }
        // }
      },
    });

  return (
    <div className="filterDivWrapped">
      {loading === false ? (
        <div className="filterDiv">
          <div className="filterOptionDiv">
            <div className="diamondFilterDiv">
              {diamondSelected === true ? (
                <div
                  className="diamondFilterWrappedDiv"
                  style={{ backgroundImage: 'linear-gradient(to right, #DC1Bd9, #4EB4C3)' }}
                  onClick={diamondFilterClicked}
                >
                  <img src={diamondImg} alt="diamondLogo" />
                  <span>&nbsp;Diamond</span>
                </div>
              ) : (
                <div className="diamondFilterWrappedDiv" onClick={diamondFilterClicked}>
                  <img src={diamondImg} alt="diamondLogo" />
                  <span>&nbsp;Diamond</span>
                </div>
              )}
            </div>

            <div className="rubyFilterDiv">
              {rubySelected === true ? (
                <div
                  className="rubyFilterWrappedDiv"
                  style={{ backgroundImage: 'linear-gradient(to right, #DC1Bd9, #4EB4C3)' }}
                  onClick={rubyFilterClicked}
                >
                  <img src={rubyImg} alt="rubyLogo" />
                  <span>&nbsp;Ruby</span>
                </div>
              ) : (
                <div className="rubyFilterWrappedDiv" onClick={rubyFilterClicked}>
                  <img src={rubyImg} alt="rubyLogo" />
                  <span>&nbsp;Ruby</span>
                </div>
              )}
            </div>

            <div className="emeraldFilterDiv">
              {emeraldSelected === true ? (
                <div
                  className="emeraldFilterWrappedDiv"
                  style={{ backgroundImage: 'linear-gradient(to right, #DC1Bd9, #4EB4C3)' }}
                  onClick={emeraldFilterClicked}
                >
                  <img src={emeraldImg} alt="emeraldLogo" />
                  <span>&nbsp;Emerald</span>
                </div>
              ) : (
                <div className="emeraldFilterWrappedDiv" onClick={emeraldFilterClicked}>
                  <img src={emeraldImg} alt="emeraldLogo" />
                  <span>&nbsp;Emerald</span>
                </div>
              )}
            </div>

            <div
              className="networkFilterDiv"
              onClick={networkFilterClicked}
              onMouseEnter={() => networkMouseEntered(true)}
              onMouseLeave={() => networkMouseEntered(false)}
            >
              <div className="networkTitleDiv">
                {networkSelected === true ? (
                  <div
                    className="networkFilterTitleWrappedDiv"
                    onClick={networkFilterClicked}
                    style={{ backgroundImage: 'linear-gradient(to right, #DC1Bd9, #4EB4C3)' }}
                  >
                    <span>&nbsp;{networkTitle}</span>
                  </div>
                ) : (
                  <div className="networkFilterTitleWrappedDiv">
                    <span>&nbsp;{networkTitle}</span>
                  </div>
                )}
              </div>

              <div className="networkSubfilterDiv" style={{ display: showNetworkSubFilter }}>
                <div className="subFilterETH" onClick={ethNetworkFilterClicked}>
                  - ETH
                </div>
                <div className="subFilterBSC" onClick={bscNetworkFilterClicked}>
                  - BSC
                </div>
              </div>
            </div>

            <div
              className="categoryFilterDiv"
              onMouseEnter={() => categoryMouseEntered(true)}
              onMouseLeave={() => categoryMouseEntered(false)}
            >
              <div className="categoryTitleDiv">
                {categorySelected === true ? (
                  <div
                    className="categoryFilterWrappedDiv"
                    onClick={categoryFilterClicked}
                    style={{ backgroundImage: 'linear-gradient(to right, #DC1Bd9, #4EB4C3)' }}
                  >
                    <span>&nbsp;{categoryTitle}</span>
                  </div>
                ) : (
                  <div className="categoryFilterWrappedDiv" onClick={categoryFilterClicked}>
                    <span>&nbsp;{categoryTitle}</span>
                  </div>
                )}
              </div>

              <div className="categorySubfilterDiv" style={{ display: showCategorySubFilter }}>
                <div className="topVoteDiv" onClick={topVoteClicked}>
                  - All time best
                </div>
                <div className="todayTopVoteDiv" onClick={todayTopVoteClicked}>
                  - Today's best
                </div>
                <div className="todayListedDiv" onClick={todayListedClicked}>
                  - Today Listed
                </div>
                <div className="presaleDiv" onClick={presaleClicked}>
                  - Presale
                </div>
              </div>
            </div>
          </div>

          <ThemeProvider theme={getMuiThemeForFilter()}>
            <MUIDataTable data={allShowData} columns={columns} options={options} />
          </ThemeProvider>
        </div>
      ) : (
        <div className="filterDiv">
          <div className="filterOptionDiv" style={{ overflowX: 'hidden' }}>
            <div className="diamondFilterDiv">
              {diamondSelected === true ? (
                <div
                  className="diamondFilterWrappedDiv"
                  style={{ backgroundImage: 'linear-gradient(to right, #DC1Bd9, #4EB4C3)' }}
                  onClick={diamondFilterClicked}
                >
                  <img src={diamondImg} alt="diamondLogo" />
                  <span>&nbsp;Diamond</span>
                </div>
              ) : (
                <div className="diamondFilterWrappedDiv" onClick={diamondFilterClicked}>
                  <img src={diamondImg} alt="diamondLogo" />
                  <span>&nbsp;Diamond</span>
                </div>
              )}
            </div>

            <div className="rubyFilterDiv">
              {rubySelected === true ? (
                <div
                  className="rubyFilterWrappedDiv"
                  style={{ backgroundImage: 'linear-gradient(to right, #DC1Bd9, #4EB4C3)' }}
                  onClick={rubyFilterClicked}
                >
                  <img src={rubyImg} alt="rubyLogo" />
                  <span>&nbsp;Ruby</span>
                </div>
              ) : (
                <div className="rubyFilterWrappedDiv" onClick={rubyFilterClicked}>
                  <img src={rubyImg} alt="rubyLogo" />
                  <span>&nbsp;Ruby</span>
                </div>
              )}
            </div>

            <div className="emeraldFilterDiv">
              {emeraldSelected === true ? (
                <div
                  className="emeraldFilterWrappedDiv"
                  style={{ backgroundImage: 'linear-gradient(to right, #DC1Bd9, #4EB4C3)' }}
                  onClick={emeraldFilterClicked}
                >
                  <img src={emeraldImg} alt="emeraldLogo" />
                  <span>&nbsp;Emerald</span>
                </div>
              ) : (
                <div className="emeraldFilterWrappedDiv" onClick={emeraldFilterClicked}>
                  <img src={emeraldImg} alt="emeraldLogo" />
                  <span>&nbsp;Emerald</span>
                </div>
              )}
            </div>

            <div
              className="networkFilterDiv"
              onClick={networkFilterClicked}
              onMouseEnter={() => networkMouseEntered(true)}
              onMouseLeave={() => networkMouseEntered(false)}
            >
              <div className="networkTitleDiv">
                {networkSelected === true ? (
                  <div
                    className="networkFilterTitleWrappedDiv"
                    onClick={networkFilterClicked}
                    style={{ backgroundImage: 'linear-gradient(to right, #DC1Bd9, #4EB4C3)' }}
                  >
                    <span>&nbsp;{networkTitle}</span>
                  </div>
                ) : (
                  <div className="networkFilterTitleWrappedDiv">
                    <span>&nbsp;{networkTitle}</span>
                  </div>
                )}
              </div>

              <div className="networkSubfilterDiv" style={{ display: showNetworkSubFilter }}>
                <div className="subFilterETH" onClick={ethNetworkFilterClicked}>
                  - ETH
                </div>
                <div className="subFilterBSC" onClick={bscNetworkFilterClicked}>
                  - BSC
                </div>
              </div>
            </div>

            <div
              className="categoryFilterDiv"
              onMouseEnter={() => categoryMouseEntered(true)}
              onMouseLeave={() => categoryMouseEntered(false)}
            >
              <div className="categoryTitleDiv">
                {categorySelected === true ? (
                  <div
                    className="categoryFilterWrappedDiv"
                    onClick={categoryFilterClicked}
                    style={{ backgroundImage: 'linear-gradient(to right, #DC1Bd9, #4EB4C3)' }}
                  >
                    <span>&nbsp;{categoryTitle}</span>
                  </div>
                ) : (
                  <div className="categoryFilterWrappedDiv" onClick={categoryFilterClicked}>
                    <span>&nbsp;{categoryTitle}</span>
                  </div>
                )}
              </div>

              <div className="categorySubfilterDiv" style={{ display: showCategorySubFilter }}>
                <div className="topVoteDiv" onClick={topVoteClicked}>
                  - All time best
                </div>
                <div className="todayTopNitroDiv" onClick={todayTopVoteClicked}>
                  - Today's best
                </div>
                <div className="todayListedDiv" onClick={todayListedClicked}>
                  - Today Listed
                </div>
                <div className="presaleDiv" onClick={presaleClicked}>
                  - Presale
                </div>
              </div>
            </div>
          </div>

          <div className="loadingDiv">
            <img src={loadingImg} alt="loading" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
