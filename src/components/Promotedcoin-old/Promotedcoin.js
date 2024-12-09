import './Promotedcoin.css';

import diamondImg from '../../assets/img/emerald.png';

// import { database } from '../../helpers/firebase.js';
// import { useEffect  } from 'react';

export const Promotedcoin = (event) => {
  const listTemp = [
    {
      name: '#1 OGEM',
      chain: 'BSC',
      mcap: '300K',
      change24h: '100%',
      launch: '3 MO.AGO',
    },
    {
      name: '#1 OGEM',
      chain: 'BSC',
      mcap: '300K',
      change24h: '100%',
      launch: '3 MO.AGO',
    },
    {
      name: '#1 OGEM',
      chain: 'BSC',
      mcap: '300K',
      change24h: '100%',
      launch: '3 MO.AGO',
    },
    {
      name: '#1 OGEM',
      chain: 'BSC',
      mcap: '300K',
      change24h: '100%',
      launch: '3 MO.AGO',
    },
    {
      name: '#1 OGEM',
      chain: 'BSC',
      mcap: '300K',
      change24h: '100%',
      launch: '3 MO.AGO',
    },
    {
      name: '#1 OGEM',
      chain: 'BSC',
      mcap: '300K',
      change24h: '100%',
      launch: '3 MO.AGO',
    },
    {
      name: '#1 OGEM',
      chain: 'BSC',
      mcap: '300K',
      change24h: '100%',
      launch: '3 MO.AGO',
    },
    {
      name: '#1 OGEM',
      chain: 'BSC',
      mcap: '300K',
      change24h: '100%',
      launch: '3 MO.AGO',
    },
    {
      name: '#1 OGEM',
      chain: 'BSC',
      mcap: '300K',
      change24h: '100%',
      launch: '3 MO.AGO',
    },
  ];

  const theaderList = ['Name', 'Chain', 'MCAP', 'Change 24H', 'Launch'];
  const tHeaders = [];
  // const loop1 = theaderList.forEach(element => {
  //     tHeaders.push(<th>{element}</th>)
  // })

  return (
    <div className="promotedcoinDivWrapped">
      <div className="promotedcoinDiv">
        <div className="titleBtnWrappedDiv">
          <button className="titleBtn">Promoted Coins</button>
        </div>
        <table>
          <tr>{tHeaders}</tr>
          {listTemp.map((key, index) => {
            return (
              <tr>
                <td>
                  <div className="tableNameDiv">
                    {key.name}&nbsp;<img src={diamondImg} alt=""></img>
                  </div>
                </td>
                <td>{key.chain}</td>
                <td>{key.mcap}</td>
                <td style={{ color: 'green' }}>{key.change24h}</td>
                <td>{key.launch}</td>
                {/* <td style={{ width:"20%" }}>
                                    <div className="voteBtnDiv">
                                        <div className="voteBtnWrapped">
                                            <button className="voteBtn">ADD NITROs</button>
                                        </div>
                                        <div className="freeVoteBtnWrapped">
                                            <button className="freeVoteBtn">FREE VOTE</button>
                                        </div>
                                    </div>
                                </td> */}
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Promotedcoin;
