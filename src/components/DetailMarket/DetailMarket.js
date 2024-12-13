import './DetailMarket.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ENVS } from '../../helpers/configurations';
import { useGetLivePrice } from 'react-pancakeswap-token-price';

export const DetailMarket = (props) => {
  const data = props.data;
  const symbol = data.symbol;

  const [loading, setLoading] = useState(true);
  const [mcap, setMCAP] = useState(0);
  const [change24h, setChange] = useState(0);
  const [price, setPrice] = useState(0);
  const [c_supply, setSupply] = useState(0);

  useEffect(() => {
    const contractAddr = data.contractAddr;
    const symbol = data.symbol;

    const fetchData = async () => {
      // console.log(data, "data", data.symbol);

      if (data.presale === false) {
        let qs = `?symbol=${symbol}&convert=USD`;
        let res = await axios.get(
          'https://agile-cove-74302.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest' +
            qs,
          {
            headers: { 'X-CMC_PRO_API_KEY': 'a8dd2502-9e7c-4bf6-8cd2-29d2829e042a' },
          }
        );

        let t_price, t_mcap, t_change24h, t_cir_supply;
        t_price = res.data.data[symbol]?.quote.USD.price;
        t_mcap = res.data.data[symbol]?.quote.USD.market_cap;
        t_change24h = res.data.data[symbol]?.quote.USD.percent_change_24h;
        t_cir_supply = res.data.data[symbol]?.circulating_supply;

        setMCAP(typeof t_mcap !== undefined ? t_mcap : 0);
        setPrice(typeof t_price !== undefined ? t_price : 0);
        setChange(typeof t_change24h !== undefined ? t_change24h : 0);
        setSupply(typeof t_cir_supply !== undefined ? t_cir_supply : 0);

        setLoading(false);
      }
    };
    fetchData();
  }, [symbol, data]);
  console.log('=====');
  // useEffect(()=>{
  useGetLivePrice()
    .getPrice('0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f')
    .then((res) => {
      console.log('------', res);
    })
    .catch((err) => {
      console.log(err);
    });
  // }, [])

  const floorValue = (value) => {
    if (value > 1000000000) {
      return Math.floor((value / 1000000000) * 100) / 100 + ' B';
    } else if (value > 1000000) {
      return Math.floor((value / 1000000) * 100) / 100 + ' M';
    } else if (value > 1000) {
      return Math.floor((value / 1000) * 100) / 100 + ' K';
    } else {
      return Math.floor(value * 100) / 100;
    }
  };

  // useEffect(()=>{
  //     getPrice('0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f')
  //     .then((res)=> console.log("token price", res))
  //   }, [])

  return (
    <div className="detailMarketDiv">
      {loading === false ? (
        <div className="detailMarketWrappedDiv">
          <div className="detailMarketTitleDiv">Coin Market Data</div>
          <div className="detailMarketContentDiv">
            Price(USD)&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            {price === 0 ? '' : floorValue(price)}
          </div>
          <div className="detailMarketContentDiv">
            Price Change(24 hrs)&emsp;&nbsp;&nbsp;&nbsp;
            {change24h === 0 ? '' : floorValue(change24h)}
          </div>
          <div className="detailMarketContentDiv">
            Market Cap&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{mcap === 0 ? '' : floorValue(mcap)}
          </div>
          <div className="detailMarketContentDiv">
            Circulating Supply&emsp;&emsp;&emsp;{c_supply === 0 ? '' : floorValue(c_supply)}
          </div>
        </div>
      ) : (
        <div className="detailMarketWrappedDiv">
          <div className="detailMarketTitleDiv">Coin Market Data</div>
          <div className="detailMarketContentDiv">Price(USD)&emsp;</div>
          <div className="detailMarketContentDiv">Price Change(24 hrs)&emsp;</div>
          <div className="detailMarketContentDiv">Market Cap&emsp;</div>
          <div className="detailMarketContentDiv">Circulating Supply</div>
        </div>
      )}
    </div>
  );
};

export default DetailMarket;
