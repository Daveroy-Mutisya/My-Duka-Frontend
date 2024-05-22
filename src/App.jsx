import { useState } from 'react'
import './App.css'
import Login from './pages/Login/login';
import React from 'react';
import { Routes, Route } from 'react-router-dom';


export const BASE_URL='https://deploying-myduka-backend.onrender.com';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;

