import './NavBar.css';

import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import logoImg from '../../assets/img/logo.png';

import { connectWallet, getCurrentWalletConnected } from '../../helpers/wallet';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context';

export const NavBar = () => {
  const [tool, setTool] = React.useState(false);
  // const [walletAddress, setWalletAddress] = useState("");
  // const [nitroAmount, setNitroAmount] = useState("");

  const { walletAddress, handleWalletAddress } = useContext(AppContext);

  // const [status, setStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const initDatas = async () => {
      if (window.ethereum) {
        const { address } = await getCurrentWalletConnected();
        // const nitroBalance = await getNitrogemAmount(address);

        handleWalletAddress(address);
        // handleNitroBalance(Number(nitroBalance));
        // handleVoteCountChanged()

        // let admins = ENVS.ADMINS;
        // if(walletAddress !== "" && admins.includes(walletAddress)){
        //   handleAdminFlag(true);
        // }else{
        //   handleAdminFlag(false);
        // }
        // setStatus(status);
        onChangeWalletListener();
        onConnectWalletHandler();
      }
    };
    initDatas();
  }, [walletAddress]);

  const onConnectWalletHandler = async () => {
    if (window.ethereum) {
      const walletResponse = await connectWallet();
      // setStatus(walletResponse.status);

      handleWalletAddress(walletResponse.address);
      //const nitroBalance = await getNitrogemAmount(walletResponse.address);
      //handleNitroBalance(Number(nitroBalance));
      // let admins = ENVS.ADMINS;
      // if(walletAddress !== "" && admins === walletAddress){
      //   handleAdminFlag(true);
      // }else{
      //   handleAdminFlag(false);
      // }
    } else {
      NotificationManager.success('🦊 You must install Metamask in your browser');
    }
  };

  const onChangeWalletListener = async () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length) {
          handleWalletAddress(accounts[0]);
          // let admins = ENVS.ADMINS;
          // if(walletAddress !== "" && admins.includes(walletAddress)){
          //   handleAdminFlag(true);
          // }else{
          //   handleAdminFlag(false);
          // }
          // setStatus("Get your DreamyGeek, 0.0314ETH");
        } else {
          handleWalletAddress('');
          // handleNitroBalance(0);
          // handleAdminFlag(false);
          // setStatus("Connect Metamask");
        }
      });

      window.ethereum.on('chainChanged', (chainId) => {
        onConnectWalletHandler();
      });
    } else {
      // setStatus(
      //   <p>
      //     🦊 You must install Metamask, a virtual Ethereum wallet, in your
      //     browser.(https://metamask.io/download.html)
      //   </p>
      // );
    }
  };

  const toolsChanged = (event) => {
    navigate(event.target.value, { replace: true });
  };

  const logoImgClicked = () => {
    navigate('/', { replace: true });
  };

  const levelUpBtnClicked = () => {
    navigate('/levelup', { replace: true });
  };

  const treasuryBtnClicked = () => {
    navigate('/treasury', { replace: true });
  };

  return (
    <div>
      <div className="navArea">
        <Grid container>
          <Grid item xs={12} md={6} lg={4}>
            <div className="logoImg" onClick={logoImgClicked}>
              <img src={logoImg} alt=""></img>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="inputDiv">
              <input type="text" placeholder="Search" className="searchInput" />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="navBtns">
              <div className="navBtnWrappedDiv">
                <Link to="/listcoin">
                  <button className="navBtn" type="button">
                    List Coin
                  </button>
                </Link>
              </div>

              <div className="navBtnWrappedDiv">
                <Link to="/promote">
                  <button className="navBtn" type="button">
                    Promote
                  </button>
                </Link>

                {/* <button className='navBtn' onClick={() => window.open("https://t.me/onlygemsfinance", "_blank")}>Promote</button>  */}
              </div>
              <div className="navBtnWrappedDiv">
                <button className="navBtn" onClick={() => onConnectWalletHandler()}>
                  {walletAddress === ''
                    ? 'Connect Wallet'
                    : walletAddress.substring(0, 5) + '..' + walletAddress.substring(36, 40)}
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className="btnArea">
        <button id="cryptocurrenciesBtn">Cryptocurrencies</button>
        <select
          id="selectTools"
          className="selectTools"
          onChange={toolsChanged}
          placeholder="Tools"
          onFocus={() => setTool(true)}
        >
          <option style={{ display: tool ? 'none' : 'hidden' }}>Tools</option>
          {/* <option key="buy_nitrogem" value="/buynitrogem" onClick={toolsChanged}>Buy Nitrogem</option>
                  <option key="listing_tiers" value="" onClick={toolsChanged}>Others will be soon</option>
                   */}
        </select>

        <button id="treasuryBtn" onClick={treasuryBtnClicked}>
          Buy Back Treasury
        </button>
        <button id="lotteryBtn">Lottery</button>
        <button id="stakingBtn">Staking</button>
        <button id="levelUpBtn" onClick={levelUpBtnClicked}>
          Level Up
        </button>
      </div>
    </div>
  );
};

export default NavBar;
