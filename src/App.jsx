import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/login';
import RegisterAdmin from './pages/Auth/RegisterAdmin';
import InviteAdmin from './pages/merchant/components/InviteAdmin';
import './App.css';

export const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/store/:id/register-admin" element={<RegisterAdmin />} />
      <Route path="/invite-admin" element={<InviteAdmin />} />
    </Routes>
  );
}

export default App;

