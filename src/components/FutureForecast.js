import React, { Component } from 'react';
import DailyForecast from './DailyForecast';

class FutureForecast extends Component {
  render(){
    const { forecast } = this.props;
    let days = [];

    if (forecast && forecast.list) {
      days = forecast.list.slice(1, 5).map((item) => {
        return (
          <DailyForecast
            key={item.dt}
            date={item.dt}
            icon={item.weather[0].icon}
            conditions={item.weather[0].description}
            min={item.temp.min}
            max={item.temp.max}
          />
        );
      })
    };

    return (
      <div>
        {days}
      </div>
    );
  }
};

export default FutureForecast;