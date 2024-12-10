import './PromotePage.css';
import promoteHeaderImg from '../../assets/img/promote_header.png';
import promoteImg1 from '../../assets/img/promoteImg1.png';
import promoteImg2 from '../../assets/img/promoteImg2.png';
import promoteImg3 from '../../assets/img/promoteImg3.png';
import promoteImg4 from '../../assets/img/promoteImg4.png';
import promoteImg5 from '../../assets/img/promoteImg5.png';
import React from 'react';
import ReactDOM from 'react-dom';

export const PromotePage = () => {
  const promoteDescArray = [
    { header: 'Wide Header Banner', detail: 'Main Page', image: promoteImg1 },
    { header: 'Rotating Header Banner', detail: 'Main Page', image: promoteImg2 },
    { header: 'Wide Header Banner', detail: 'Coin Page', image: promoteImg3 },
    { header: 'Rotating Header Banner', detail: 'Coin Page', image: promoteImg4 },
    { header: 'Trending Coin Section', detail: '', image: promoteImg5 },
  ];

  const lists = [];

  promoteDescArray.forEach((element) => {
    lists.push(
      <div className="promotePageList">
        <div className="promoteImgDiv">
          <img src={element.image}></img>
        </div>
        <div className="promoteDescDiv">
          <div className="promoteHeaderBannerDiv">
            <div className="promoteHeaderBannerDivWrapped">
              <span className="headerBannerTitleSpan">{element.header}</span>
              <br />
              <span className="headerBannerDescSpan">{element.detail}</span>
            </div>
          </div>
          <div className="dayPromotionBnb">
            <div className="leftSideDescBnb">1 day promotion</div>
            <div className="bnbAmountDiv">0.3 BNB</div>
          </div>
          <div className="dayPromotionBnb">
            <div className="leftSideDescBnb">3 days promotion</div>
            <div className="bnbAmountDiv">0.75 BNB</div>
          </div>
          <div className="dayPromotionBnb">
            <div className="leftSideDescBnb">7 days promotion</div>
            <div className="bnbAmountDiv">1.5 BNB</div>
          </div>
          <div className="footerPromote">
            <span className="prmoteFooterSpan">
              Size of banner : 600 * 240px
              <br />
              Image type : .jpg .jpeg .png .gif
              <br />
              File size &lt; 4 Mb
            </span>
          </div>

          <div className="promoteBuyNowBtnDiv">BUY NOW</div>
        </div>
      </div>
    );
  });

  return (
    <div className="promotePageDiv">
      <div className="promotePageHeaderDiv">
        <div className="promotePageLeftHeader">
          <span className="promoteTitleSpan">Promote your coin</span>
          <br />
          <span className="promoteDescSpan">
            {' '}
            Promote your coin with one of our effective packages
          </span>
        </div>
        <div className="promotePageRightHeader">
          <img src={promoteHeaderImg}></img>
        </div>
      </div>
      {lists}
    </div>
  );
};

export default PromotePage;
