import { useState } from 'react'
import './App.css'
import Login from './pages/Auth/login';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterAdmin from './pages/Auth/RegisterAdmin';
import ClerkDashboard from './pages/clerk/ClerkDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import MerchantDashboard from './pages/merchant/MerchantDashboard';
import InviteAdmin from './pages/merchant/components/InviteAdmin';
import Stores from './pages/merchant/components/Stores';


export const BASE_URL='https://deploying-myduka-backend.onrender.com';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/merchant/dashboard" element={< MerchantDashboard/>} />
      <Route path="/admin/dashboard" element={<AdminDashboard/>} />
      <Route path="/clerk/dashboard" element={<ClerkDashboard/>} />
      <Route path="merchant/invite-admin" element={<InviteAdmin />} />
      <Route path="merchant/store/:id/register-admin" component={<RegisterAdmin/>} />
      <Route path="/Stores" element={<Stores/>} />
    </Routes>
  );
}

export default App;

