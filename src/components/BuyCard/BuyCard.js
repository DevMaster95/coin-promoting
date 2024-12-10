import './BuyCard.css';
import nitrogemImg from '../../assets/img/nitrogem.png';
import bscImg from '../../assets/img/bsc.png';

import { useContext } from 'react';

import { buyNitrogem } from '../../helpers/interact';
import { NotificationManager } from 'react-notifications';
import { AppContext } from '../../context';

export const BuyCard = (event) => {
  const { walletAddress, nitroBalance, handleNitroBalance } = useContext(AppContext);

  const bnb_amount = event.bnbAmount;
  const nitro_amount = event.nitroAmount;

  const buyNitrogemClicked = async () => {
    const { success } = await buyNitrogem(walletAddress, nitro_amount, bnb_amount);
    if (success) {
      handleNitroBalance(nitroBalance + nitro_amount);
      NotificationManager.success('Congratulations, Buy nitrogem has successed.');
    } else {
      NotificationManager.error('Transaction has failed !');
    }
  };
  return (
    <div className="buyCardDiv">
      <div className="buyCardDivWrap">
        <div className="buyCardImgDiv">
          <img src={nitrogemImg} alt=""></img>
        </div>
        <div className="bnbAreaDiv">
          <span>{bnb_amount}&nbsp;</span>
          <img src={bscImg} alt=""></img>
        </div>
      </div>
      <div className="buyCardBtnDiv">
        <button onClick={buyNitrogemClicked}> {nitro_amount} Nitrogems </button>
      </div>
    </div>
  );
};

export default BuyCard;
