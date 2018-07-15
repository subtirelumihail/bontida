import 'whatwg-fetch'
import config from '../conifg';
const baseUrl = config.baseUrl;

const httpService = {
  get: function(url, backup){
    const baseUrl = backup  ? config.backupURL : config.baseUrl;
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      mode: 'cors'
    };
    return fetch(baseUrl + url, backup ? {} : options)
    .then((response) => response.json());
  },
  getExternal: function(url){
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      mode: 'cors',
    })
    .then(function(response){
      return response.json();
    });
  },
  post: function(url, body){
    return fetch(baseUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      mode: 'cors',
      body
    })
    .then(function(response){
      return response.json();
    });
  }
};

export default httpService;