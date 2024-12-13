import './Footer.css';
import logoBlackImg from '../../assets/img/logo_black.png';
import Grid from '@mui/material/Grid';
import React from 'react';
import ReactDOM from 'react-dom';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="logoBlackImg">
        <img src={logoBlackImg} alt=""></img>
      </div>

      <div className="gridArea">
        <Grid container>
          <Grid item xs={12} md={6}>
            {' '}
            <span> Coinlocator</span>{' '}
          </Grid>
          <Grid item xs={12} md={6}>
            {' '}
            <span> Staking Platform</span>{' '}
          </Grid>
          <Grid item xs={12} md={6}>
            {' '}
            <span> Launchpad </span>{' '}
          </Grid>
          <Grid item xs={12} md={6}>
            {' '}
            <span> DEX</span>{' '}
          </Grid>
          <Grid item xs={12} md={6}>
            {' '}
            <span> Airdrop </span>{' '}
          </Grid>
          <Grid item xs={12} md={6}>
            {' '}
            <span> Volume Machine</span>{' '}
          </Grid>
          <Grid item xs={12} md={6}>
            {' '}
            <span> Projects </span>{' '}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
