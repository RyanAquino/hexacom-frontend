import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './components/App';

axios.defaults.baseURL = 'http://192.168.100.28:8082/';
axios.defaults.ba
axios.defaults.withCredentials = true
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
