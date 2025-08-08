import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Login from '../pages/Login/login';
import Home from '../pages/Home/home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;