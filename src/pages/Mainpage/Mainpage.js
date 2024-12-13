import React from 'react';
// import Grid from '@mui/material/Grid';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Mainpage.css';

import Tiers from '../Tiers/Tiers.js';
import Listcoin from '../Listcoin/Listcoin.js';
import Default from '../Default/Default.js';
import Levelup from '../Levelup/Levelup.js';
import Treasury from '../Treasury/Treasury.js';
import NavBar from '../../components/NavBar/NavBar.js';
import Details from '../../pages/Details/Details';
import PromotePage from '../../pages/PromotePage/PromotePage.js';

import { WalletProvider } from '../../context';

export const Mainpage = () => {
  return (
    <WalletProvider>
      <BrowserRouter>
        <div className="mainPage">
          <NavBar />
          <div className="mainDiv">
            <Routes>
              <Route exact path="/" element={<Default />} />
              <Route exact path="/listcoin" element={<Listcoin data="" />} />
              {/* <Route exact path='/buynitrogem' element={<BuyNitrogem />} /> */}
              <Route exact path="/tiers" element={<Tiers />} />
              <Route exact path="/details/:id" element={<Details />} />
              <Route exact path="/levelup" element={<Levelup />} />
              <Route exact path="/treasury" element={<Treasury />} />
              <Route exact path="/promote" element={<PromotePage />} />
              {/* Promote page  */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </WalletProvider>
  );
};

export default Mainpage;
