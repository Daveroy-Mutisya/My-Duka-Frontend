import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/login';
import RegisterAdmin from './pages/auth/RegisterAdmin';
import InviteAdmin from './pages/merchant/components/InviteAdmin';
import MerchantSideBar from './pages/merchant/components/MerchantSideBar';
import Stores from './pages/merchant/components/Stores';

export const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

function App() {
  return (
    <div className="app-container">
      <MerchantSideBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/store/:id/register-admin" element={<RegisterAdmin />} />
          <Route path="/invite-admin" element={<InviteAdmin />} />
          <Route path="/Stores" element={<Stores/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
