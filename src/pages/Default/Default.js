import './Default.css';
import React from 'react';
import ReactDOM from 'react-dom';

import advertiseImg from '../../assets/img/advertise.png';

import banner1Img from '../../assets/img/banner1.jpg';
import banner2Img from '../../assets/img/banner2.jpg';
import banner3Img from '../../assets/img/banner3.jpg';
import banner4Img from '../../assets/img/banner4.jpg';

import Promoted from '../../components/PromotedCoins/Promoted';

import Filter from '../../components/Filter/Filter';

export const Default = (event) => {
  return (
    <div className="defaultMainDiv">
      <div className="headerImgDiv">
        <img src={advertiseImg} alt=""></img>
      </div>
      <div className="bannerAreaDiv">
        <div className="banner1Div">
          <img src={banner1Img} class="first" alt=""></img>
          <img src={banner4Img} class="second" alt=""></img>
        </div>
        <div className="banner2Div">
          <img src={banner2Img} class="first" alt=""></img>
          <img src={banner3Img} class="second" alt=""></img>
        </div>
        <div className="banner3Div">
          <img src={banner1Img} class="first" alt=""></img>
          <img src={banner3Img} class="second" alt=""></img>
        </div>
      </div>
      <Promoted title="Promoted" filter="promoted" caption="" />
      <Filter />

      <div className="allCoinDiv"></div>
    </div>
  );
};

export default Default;
