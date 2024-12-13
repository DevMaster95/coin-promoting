import './Overview.css';
import moment from 'moment';

export const Overview = (props) => {
  const epochToDate = (epoch) => {
    return moment.unix(epoch).format('DD MMM YYYY');
  };

  const data = props.data;
  return (
    <div className="overviewDiv">
      <div className="overviewWrappDiv">
        <div className="overviewWrappedDiv">
          <div className="headerTitle">
            <span>What is {data.name} ?</span>
          </div>
          <div className="dateDiv">
            <span>Launched on &emsp;{epochToDate(data.launch)}</span>
            <br />
            <span>Added&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;{epochToDate(data.listed)}</span>
          </div>
          <div className="descriptionDiv">
            <span>{data.description}</span>
          </div>

          <div className="videoDiv">
            <video controls width="100%">
              <source src={data.videolink} type="video/mp4" />
            </video>
          </div>

          <div className="overviewTitleDiv">
            <div className="overviewTitleWrappedDiv">Overview</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
