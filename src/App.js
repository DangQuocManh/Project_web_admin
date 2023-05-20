import logo from './logo.svg';
import './App.scss';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'swiper/swiper.min.css';
import './App.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/grid/css/grid.css'

import RouteAdmin from './config/RouteAdmin';
import LoginAdmin from './components/login/LoginAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin/*' element={<RouteAdmin />} />
        <Route path='/' element={<LoginAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
