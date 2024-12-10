import './Intro.scss';

import banner from '../../assets/img/banner image-01.jpg';
import dropBack from '../../assets/img/2-geeks-by-drop-date-01.png';
import dropDate from '../../assets/img/drop dates.png';
import minus from '../../assets/img/minus.svg';
import plus from '../../assets/img/plus.svg';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const Intro = ({ walletAddress, onConnectWalletHandler, mintLoading, onMintHandler }) => {
  const [number, setNumber] = useState(1);
  const [total, setTotal] = useState(0.03);
  const actionMinus = () => {
    let index = number - 1;
    setNumber(index);
    setTotal(index * 0.03);
  };

  const actionPlus = () => {
    let index = number + 1;
    setNumber(index);
    setTotal(index * 0.03);
  };

  const mintAction = () => {
    onMintHandler(number);
  };

  return (
    <section className="intro" id="intro">
      <div className="intro__banner">
        <img alt="pic" src={banner}></img>
      </div>

      <div className="intro__drop container">
        <div className="intro__drop__back">
          <img alt="pic" src={dropBack}></img>
        </div>

        <div className="intro__drop__date">
          <div className="intro__drop__date__mint">
            <button
              className="intro__drop__date__mint__minus"
              onClick={() => {
                return number > 1 ? actionMinus() : null;
              }}
            >
              <img alt="src" src={minus}></img>
            </button>
            <span className="intro__drop__date__mint__value">{number}</span>
            <button
              className="intro__drop__date__mint__plus"
              onClick={() => (number < 10 ? actionPlus() : null)}
            >
              <img alt="src" src={plus}></img>
            </button>
            <button
              className="intro__drop__date__mint__place"
              onClick={() => {
                if (!mintLoading) mintAction();
              }}
            >
              {' '}
              {mintLoading && (
                <FontAwesomeIcon className="mint-spinner" icon={faSpinner} size="0.4x" />
              )}
              &nbsp;mint{' '}
            </button>
          </div>

          <img alt="pic" src={dropDate}></img>
        </div>
      </div>
    </section>
  );
};

export default Intro;
