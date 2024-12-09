import BuyCard from '../../components/BuyCard/BuyCard';
// import Grid from '@mui/material/Grid';

import './BuyNitrogem.css';

export const BuyNitrogem = () => {
  return (
    <div className="buyNitrogemAreaDiv">
      <div className="buyNitrogemHeader1Div">
        <span>Buy Nitrogems</span>
      </div>
      <div className="buyNitrogemHeader2Div">
        <span></span>
      </div>

      <div className="buyCardArea">
        <BuyCard bnbAmount="0.001" nitroAmount="5" />
        <BuyCard bnbAmount="0.005" nitroAmount="25" />
        <BuyCard bnbAmount="0.01" nitroAmount="55" />
        <BuyCard bnbAmount="0.05" nitroAmount="275" />
        <BuyCard bnbAmount="0.1" nitroAmount="550" />
        <BuyCard bnbAmount="0.5" nitroAmount="2750" />
        <BuyCard bnbAmount="1" nitroAmount="5500" />
        <BuyCard bnbAmount="3" nitroAmount="18000" />
        <BuyCard bnbAmount="5" nitroAmount="30000" />
      </div>
    </div>
  );
};

export default BuyNitrogem;
