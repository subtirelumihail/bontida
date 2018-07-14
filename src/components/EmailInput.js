import React, { Component } from 'react';
import validate from 'validate.js';
import classnames from 'classnames';
import Http from '../services/httpService';
import { BounceLoader } from 'react-spinners';

class EmailInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: null,
      message: null,
      loading: false
    }
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleValidate = () => {
    const { value } = this.state;
    const error = validate.single(value, {
      presence: {
        message: 'Email-ul nu poate fi gol'
      },
      email: {
        message: 'Email-ul nu este valid'
      },
    });

    this.setState({ error });

    return error;
  }

  handleEmail = () => {
    const hasError = this.handleValidate();
    if (!hasError) {
      this.setState({
        loading: true
      })
      Http.get('subscribe')
      .then(() => {
        setTimeout(() => this.setState({
          loading: false,
          message: 'Felicitari, acum vei primi alerte cand ploua in Bontida!'
        }), 1000);
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: 'Eroare, reincearca !'
        });
      });
    }
  }

  renderLoading = () => {
    return (
      <div className="email-loading">
        <BounceLoader
          size={30}
          color={'rgb(254, 226, 52)'}
          loading={this.state.loading}
        />
      </div>
    )
  }

  render () {
    const { value, error, loading, message } = this.state;
    return (
      <div>
        <div className="email-container">
          <div className="email-title">
            Introduceti email-ul pentru a primi alerte cu 2 ore inainte sa inceapa ploaia
          </div>
          {!message && <input
            className={classnames("email", {
              "error": error
            })}
            type="email"
            value={value}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
            placeholder="email..."
          />
          }
          <div className="email-errors">
            {error}
          </div>
          {
            loading ? this.renderLoading() :
              message ?
                <div className="email-message">
                  {message}
                </div> :
                <div
                  className="email-button"
                  onClick={this.handleEmail}
                >
                  Aboneazate la alerte
                </div>
          }
        </div>
      </div>
    )
  }
}

export default EmailInput;