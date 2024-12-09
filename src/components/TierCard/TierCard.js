import './TierCard.css';
import React from 'react';
import ReactDOM from 'react-dom';

import { database } from '../../helpers/firebase.js';
import { NotificationManager } from 'react-notifications';
import { buyDiamondTier } from '../../helpers/interact';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENVS } from '../../helpers/configurations';
import { AppContext } from '../../context';
import { ethers } from 'ethers';

export const TierCard = (props) => {
  const data = props.data;
  const listingInfo = props.info;
  const id = props.id;

  const { walletAddress } = useContext(AppContext);

  const navigate = useNavigate();

  const lists = [];

  data.mainStrings.forEach((element) => {
    lists.push(
      <div className="tierCardEachLineDiv">
        <div className="imgWrap">
          <img src={data.image} alt=""></img>
        </div>
        <span>{element}</span>
      </div>
    );
  });

  const pushToDb = (amount) => {
    let db = database.ref('/coinlist');

    listingInfo.dailyCount = amount;
    listingInfo.voteCount = amount;
    listingInfo.dailyStart = Math.floor(Math.floor(Date.now() / 1000) / 86400) * 86400;

    listingInfo.weeklyCount = amount;
    let updateWeeklyStart = 0;

    let epochNow = Math.floor(Date.now() / 1000);
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
    listingInfo.weeklyStart = updateWeeklyStart;

    db.push(listingInfo)
      .catch((e) => {
        NotificationManager.error('Listing is failure.');
        console.log(e);
      })
      .then(() => {
        NotificationManager.success('Congratulations, You requested successfully.');
      });
  };

  const updateToDb = (amount) => {
    let updateWeeklyStart = 0;

    let epochNow = Math.floor(Date.now() / 1000);
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
    listingInfo.weeklyStart = updateWeeklyStart;

    let updateDb = database.ref('/coinlist/' + id);
    updateDb.update({
      voteCount: amount ? amount : '',
      dailyCount: amount ? amount : '',
      dailyStart: Math.floor(Math.floor(Date.now() / 1000) / 86400) * 86400,
      weeklyCount: amount ? amount : '',
      weeklyStart: updateWeeklyStart,
    });
  };

  const buyBtnClicked = async () => {
    let voteFee = ENVS.NORMAL_VOTE_FEE;
    let voteAmount = 1;
    let tgUrl = '';

    if (id === '') {
      // Listing first time
      if (data.headerString === 'Ruby Tier') {
        voteFee = ENVS.RUBY_TIRE_FEE;
        voteAmount = ENVS.RUBY_TIRE_LIMIT;

        tgUrl = process.env.REACT_APP_SERVER_URL + '/ruby/?token=' + listingInfo.name;
      } else if (data.headerString === 'Diamond Tier') {
        voteFee = ENVS.DIAMOND_TIRE_FEE;
        voteAmount = ENVS.DIAMOND_TIRE_LIMIT;
        tgUrl = process.env.REACT_APP_SERVER_URL + '/diamond/?token=' + listingInfo.name;
      }
      // console.log("id=null vote amount", voteAmount);
    } else {
      if (data.headerString === 'Ruby Tier' && listingInfo.voteCount < ENVS.RUBY_TIRE_LIMIT) {
        voteFee = ENVS.RUBY_TIRE_FEE;
        voteAmount = ENVS.RUBY_TIRE_LIMIT;
        tgUrl = process.env.REACT_APP_SERVER_URL + '/diamond/?token=' + listingInfo.name;
      } else if (
        data.headerString === 'Diamond Tier' &&
        listingInfo.voteCount < ENVS.DIAMOND_TIRE_LIMIT
      ) {
        voteFee = ENVS.DIAMOND_TIRE_FEE;
        voteAmount = ENVS.DIAMOND_TIRE_LIMIT;
        tgUrl = process.env.REACT_APP_SERVER_URL + '/diamond/?token=' + listingInfo.name;
      } else {
        NotificationManager.warning('You can only upgrade.');
        return;
      }

      // console.log("id not null vote amount", voteAmount);
    }

    const infuraProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = infuraProvider.getSigner();

    const tx = {
      from: walletAddress,
      to: ENVS.CHARITY_ADDR,
      value: ethers.utils.parseUnits(voteFee),
    };

    await signer.sendTransaction(tx).then(async () => {
      await fetch(`${tgUrl}`, {
        method: 'GET',
      })
        .then((res) => {
          NotificationManager.info('Notification about Tier upgrade has sent to TG channel.');
        })
        .catch((err) => console.log(err));

      if (id === '') pushToDb(voteAmount);
      else updateToDb(voteAmount);

      navigate('/', { replace: true });

      // console.log("Notification about Tier upgrade has sent to TG channel successfully sent");
    });
  };
  return (
    <div className="TierCardDiv">
      <img
        src={data.image}
        style={{ position: 'absolute', right: -20, top: -20, width: '50px' }}
        alt=""
      ></img>
      <div className="TierCardHeadingDiv">
        <span style={{ color: data.color }}>{data.headerString}</span>
      </div>
      <div className="TierCardMainStringDiv">{lists}</div>
      <div className="TierCardBottomDiv">
        <div className="TierCardBottomWrapDiv">
          <span>{data.buyAmount}</span>
          <button onClick={buyBtnClicked}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default TierCard;
