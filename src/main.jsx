import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import AddClerk from './pages/admin/components/AddClerk';
import AdminDashboard from './pages/admin/AdminDashboard';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Router>
        <AddClerk/>
    </Router>
);
