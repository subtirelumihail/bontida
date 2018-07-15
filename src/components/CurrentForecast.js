import React, { Component } from 'react';
import Moment from 'moment';
import config from '../conifg';

class CurrentForecast extends Component {
  render() {
    const { forecast, backup } = this.props;
    if (!forecast) {
      return 'Probleme de conexiune, revenim imediat :)';
    }
    const temp = forecast ? Math.round(forecast.main.temp) : '';
    const icon = forecast ? config.imgPath + forecast.weather[0].icon + '.png' : '';
    const date = forecast ? Moment.unix(forecast.dt).format("ddd, h:mm a") : '';

    return (
      <div className="list-group-item">
        <div>
          <div className="date">{date}</div>
        </div>
        <div className="icon"><img alt="icon" src={icon} /></div>
        <div className="temp">{backup ? temp : Math.ceil(temp - 273.15)}&deg;c</div>
      </div>
    );
  }
};

export default CurrentForecast;