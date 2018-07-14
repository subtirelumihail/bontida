import React, { Component } from 'react';
import CurrentForecast from './CurrentForecast';
import FutureForecast from './FutureForecast';

class Weather extends Component {
  render() {
    const { today, daily } = this.props.forecast;
    const background = {background: this.props.background};

    return (
      <div>
        <div className="current-forecast list-group" style={background}>
          {<CurrentForecast forecast={today} city={this.props.city}/>}
        </div>
        <div className="future-forecast list-group">
          {<FutureForecast forecast={daily} city={this.props.city}/>}
        </div>
      </div>
    );
  }
};

export default Weather;