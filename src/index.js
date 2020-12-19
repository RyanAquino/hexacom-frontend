import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './components/App';

axios.defaults.baseURL = '/api/';
axios.defaults.withCredentials = true
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
