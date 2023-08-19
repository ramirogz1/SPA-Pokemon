import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Provider } from "react-redux";
import {store} from './store'
import axios from 'axios';
axios.defaults.baseURL= "https://spa-pokemon-yn7t.onrender.com/"



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
  
)
