import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/login';
import Tables from './pages/clerk/index'; // Import the Tables component
import NewClerkForm from './pages/clerk/components/AddProducts'; // Import the NewClerkForm component
import './App.css';

export const BASE_URL='https://deploying-myduka-backend.onrender.com';

function App() {
  return (
    <Routes>
      <Route path="/Products" element={<Tables />} /> {/* Render the Tables component for the "/Products" path */}
      <Route path="/AddClerk" element={<NewClerkForm />} /> {/* Render the NewClerkForm component for the "/AddClerk" path */}
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
