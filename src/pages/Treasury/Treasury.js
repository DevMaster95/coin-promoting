import './Treasury.css';
import React from 'react';
import ReactDOM from 'react-dom';
import treasuryAdvertiseImg from '../../assets/img/treasuryAdvertise.png';
import treasuryBudgetImg from '../../assets/img/treasuryBudget.png';

import Promoted from '../../components/PromotedCoins/Promoted';
import { useEffect, useState } from 'react';
import { ENVS } from '../../helpers/configurations';
import { ethers } from 'ethers';
import axios from 'axios';
export const Treasury = () => {
  const [bnbBalance, setBNBBalance] = useState(0);

  useEffect(() => {
    const getBNBValueFunc = async () => {
      const infuraProvider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = infuraProvider.getSigner();
      const bnbBalance = await infuraProvider.getBalance(ENVS.TREASURY_ADDR);

      let qs = `?symbol=BNB&convert=USD`;
      let res = await axios.get(
        'https://agile-cove-74302.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest' +
          qs,
        {
          headers: { 'X-CMC_PRO_API_KEY': 'a8dd2502-9e7c-4bf6-8cd2-29d2829e042a' },
        }
      );

      let bnbPrice = res.data.data['BNB']?.quote.USD.price;
      if (typeof bnbPrice !== undefined) {
        let bnbValuable = ethers.utils.formatUnits(bnbBalance, 18) * bnbPrice;
        setBNBBalance('$' + bnbValuable.toFixed(1));
      } else {
        setBNBBalance(ethers.utils.formatUnits(bnbBalance, 18) + 'BNB');
      }
    };

    getBNBValueFunc();
  }, []);

  return (
    <div className="treasuryDiv">
      <div className="treasuryAdvertiseDiv">
        <img src={treasuryAdvertiseImg} alt=""></img>
      </div>
      <div className="treasuryContentsDiv">Buy Back Treasury</div>
      <Promoted title="Vote Tracker" filter="weeklyCount" caption="Weekly Ranking" />
      <div className="treasuryContentsDiv">Treasury Status</div>
      <div className="treasuryBudgetDiv">
        <div className="budgetWrapperDiv">
          <img src={treasuryBudgetImg} alt=""></img>
        </div>
        <div className="budgetAmountDiv">{bnbBalance}</div>
      </div>
    </div>
  );
};

export default Treasury;
