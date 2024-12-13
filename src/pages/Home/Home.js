import React from 'react';
import ReactDOM from 'react-dom';
// import NavBar from "../../components/NavBar/NavBar";

import Footer from '../../components/Footer/Footer';
import Trendbar from '../../components/TrendBar/Trendbar';
import Mainpage from '../../pages/Mainpage/Mainpage';

export const Home = () => {
  return (
    <div>
      <Trendbar />
      <Mainpage />
      <Footer />
    </div>
  );
};

export default Home;
