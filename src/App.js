import React, { Component } from 'react';
import Weather from './components/Weather';
import EmailInput from './components/EmailInput';
import Http from './services/httpService';
import { ClipLoader } from 'react-spinners';
import RandomGiphy from './components/RandomGiphy';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daily: null,
      today: null,
      loading: true,
      error: false,
      rain: {}
    };
  }

  componentDidMount(){
    this.setState({
      loading: true
    })
    Http.get('forecast')
    .then(({ daily, today, rain }) => {
      setTimeout(() => this.setState({
        daily,
        today,
        rain,
        loading: false
      }), 1000);
    })
    .catch(() => {
      this.setState({
        error: true,
        loading: false
      });
    });
  }

  renderLoading = () => {
    return (
      <div className="loading">
        <ClipLoader
          size={60}
          color={'rgb(254, 226, 52)'}
          loading={this.state.loading}
        />
      </div>
    )
  }

  render() {
    const { today, daily, loading, rain, error } = this.state;
    return (
      <div className="App">
        {
          loading ? this.renderLoading() :
          <div>
            <RandomGiphy
              isItRainingNow={rain.isItRainingNow}
              error={error}
            />
            {
              !error &&
              <div className="content">
                <div className="left">
                  <EmailInput />
                </div>
                <div className="right">
                  <Weather
                    loading={loading}
                    forecast={{ daily, today }}
                    city="bontida"
                    background="#fee234"
                  />
                </div>
              </div>
            }
            <div className="donate">
              Daca ti-a placut, doneaza :)
              <div className="smallest">
              si daca nu ti-a placut, doneaza mai mult
              </div>
              <br />
              <br />
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick"/>
                <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----"/>
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
              </form>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
