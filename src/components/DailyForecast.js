import React, { Component } from 'react';
import Moment from 'moment';
import 'moment/locale/ro';
import config from '../conifg';

class DailyForecast extends Component {
  render() {
    Moment().locale('ro');
    const date = Moment.unix(this.props.date).format("dddd");
    const icon = config.imgPath + this.props.icon + '.png';
    const min = Math.round(this.props.min);
    const max = Math.round(this.props.max);
    return (
      <div className="list-group-item">
        <div className="row">
          <div className="col-xs-4">
            <div><strong>{date}</strong></div>
            <div>{this.props.conditions}</div>
          </div>
          <div className="col-xs-4 text-center">
            <img alt="icon" src={icon} width="40px" />
          </div>
          <div className="col-xs-4 text-right">
            <div><strong>{max}&deg;c</strong></div>
            <div>{min}&deg;c</div>
          </div>
        </div>
      </div>
    );
  }
};

export default DailyForecast;