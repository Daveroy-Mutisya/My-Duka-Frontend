import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login';
import InviteAdmin from './pages/merchant/components/InviteAdmin';
import RegisterAdmin from './pages/auth/RegisterAdmin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/invite-admin" element={<InviteAdmin />} />
      <Route path="/register-admin/:id" element={<RegisterAdmin />} />
    </Routes>
  );
}

export default App;
