import React from 'react';
// import ReactDOM from 'react-dom';

import store from './redux/store'
import { Provider } from 'react-redux'

import App from './App.js';
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LoginAdmin from './components/login/LoginAdmin';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();