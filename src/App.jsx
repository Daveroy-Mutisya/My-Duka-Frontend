import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/login';
import Tables from './pages/clerk/index';
import NewClerkForm from './pages/clerk/components/AddProducts';
import './App.css';

export const BASE_URL='https://deploying-myduka-backend.onrender.com';

function App() {
  return (
    <Routes>
      <Route path="/Products" element={<Tables />} />
      <Route path="/AddClerk" element={<NewClerkForm />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;