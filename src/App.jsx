import { useState } from 'react'
import './App.css'
import Login from './pages/Auth/login';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterAdmin from './pages/Auth/RegisterAdmin';

export const BASE_URL='https://deploying-myduka-backend.onrender.com';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/store/:id/register-admin" component={RegisterAdmin} />
    </Routes>
  );
}

export default App;

