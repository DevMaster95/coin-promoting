import './Levelup.css';
import React from 'react';
import ReactDOM from 'react-dom';

import levelupHeaderImg from '../../assets/img/levelup_header.png';
import levelupFooterImg from '../../assets/img/levelup_footer.png';

export const Levelup = () => {
  return (
    <div className="levelupDiv">
      <div className="levelupWrappedDiv">
        <div className="levelupHeaderDiv">
          <img src={levelupHeaderImg} alt="" />
        </div>

        <div className="levelupContentsDiv">
          <div className="levelupContentTitle">Take your project to the next level</div>
          <div className="levelupContentTitle">
            Graphic design - Web Dev - Marketing - AMA's - NFTs - Blockchain Dev
          </div>
        </div>
        <div className="levelupFooterDiv">
          <img src={levelupFooterImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Levelup;
