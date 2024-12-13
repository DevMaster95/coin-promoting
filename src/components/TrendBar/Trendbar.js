import './Trendbar.css';
// import coinImgExample from '../../assets/img/coin_example.png';
import React from 'react';
import ReactDOM from 'react-dom';

export const Trendbar = () => {
  return (
    <div className="trendBar">
      <div className="trendLogo">
        <span className="trendBarSpan">Trend Bar</span>
      </div>

      <div className="itemCoinWrappedDiv">
        {/* <div className="itemCoin">
                    <img className='exampleImg' src={coinImgExample}>
                    </img>
                    <span className='coinNameSpan'>Coin Example</span>
                </div>

                <div className="itemCoin">
                    <img className='exampleImg' src={coinImgExample}>
                    </img>
                    <span className='coinNameSpan'>Coin Example</span>
                </div>

                <div className="itemCoin">
                    <img className='exampleImg' src={coinImgExample}>
                    </img>
                    <span className='coinNameSpan'>Coin Example</span>
                </div> */}
      </div>
    </div>
  );
};

export default Trendbar;
