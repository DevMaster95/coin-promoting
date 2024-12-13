import TierCard from '../../components/TierCard/TierCard';
import tierLogoImg from '../../assets/img/tier_header.png';

import emeraldImg from '../../assets/img/emerald.png';
import rubyImg from '../../assets/img/ruby.png';
import diamondImg from '../../assets/img/diamond.png';

import { useLocation } from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom';

import './Tiers.css';

export const Tiers = ({ route, navigation }) => {
  const location = useLocation();
  console.log(location, '------------------sosddlsdiosdiosios---------------');
  const listingInfo = location.state.info;
  const id = location.state.id;
  console.log(listingInfo, '=====listing info tiers.js');

  const EmeraldTier = {
    headerString: 'Emerald Tier',
    color: 'green',
    buyAmount: 'FREE',
    buyAmountInt: 0,
    nitrogemAmount: 0,
    image: emeraldImg,
    mainStrings: [
      'Listing on CL Platform',
      'Upgradable to Ruby or Diamond tierat any time',
      'Promotable on CL platform',
    ],
  };

  const RubyTier = {
    headerString: 'Ruby Tier',
    color: 'red',
    buyAmount: '0.5 BNB',
    buyAmountInt: '0.5',
    nitrogemAmount: 250,
    image: rubyImg,
    mainStrings: [
      'Notification Ruby Tier listing sent to @OnlyGemsFinance telegram channel(6K+ members)',
      '250 Votes',
      '5% discount on advertising packages',
      '5% discount on Level Up agency services',
      'Promotable on CL Platform',
    ],
  };

  const DiamondTier = {
    headerString: 'Diamond Tier',
    color: 'white',
    buyAmount: '1 BNB',
    buyAmountInt: '1',
    nitrogemAmount: 500,
    image: diamondImg,
    mainStrings: [
      'Notification about Diamond Tier listing sent to over 12 telegram channels(20K+ members)',
      'Qualifies for CoinLocator buyback + burn competition',
      '500 Votes',
      '10% discount on advertising packages',
      '5% discount on Level Up agency services',
    ],
  };

  return (
    <div className="TiersDiv">
      <div className="TiersHeaderDiv">
        <span>Listings on </span>
        <img src={tierLogoImg} alt="tierLogo"></img>
      </div>
      <div className="TiersBodyDiv">
        <TierCard type="emerald" data={EmeraldTier} info={listingInfo} id={id} />
        <TierCard type="ruby" data={RubyTier} info={listingInfo} id={id} />
        <TierCard type="diamond" data={DiamondTier} info={listingInfo} id={id} />
      </div>
    </div>
  );
};

export default Tiers;
