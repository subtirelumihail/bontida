import 'whatwg-fetch'
import Config from '../conifg';
const baseUrl = Config.baseUrl;

const httpService = {
  get: function(url){
    return fetch(baseUrl + url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      mode: 'cors'
    })
    .then(function(response){
      return response.json();
    });
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