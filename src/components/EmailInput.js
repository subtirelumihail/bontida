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
    const { subscribedEvent } = this.props;
    const { value } = this.state;
    const hasError = this.handleValidate();
    if (!hasError) {
      this.setState({
        loading: true
      })
      subscribedEvent();
      Http.post('subscribe', {
        email: value
      })
      .then(({ errors }) => {
        let errMessage = null;
        let message = 'Felicitari, un email de confirmare a fost deja trimis pe adresa de email, pentru a activa notificarile te rugam sa dai click pe link-ul de confirmare';
        if (errors === 'already_subscribed') {
          errMessage = 'Email-ul este deja inscris in aplicatie'
        }

        if (errors === 'awaiting_confirmation') {
          errMessage = 'Un email de confirmare a fost deja trimis pe adresa de email, verifica daca nu cumva a ajuns in spam'
        }
        setTimeout(() => this.setState({
          loading: false,
          error: errMessage,
          message: errMessage ? null : message
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
          {!loading && !message &&
            <div className="legal">
              Prin apasarea butonului de "Aboneazate la alerte" sunteti de acord cu
              <a href="/termenii.html" target="_blank"> termenii si conditiile</a>
            </div>
          }
          </div>
      </div>
    )
  }
}

export default EmailInput;