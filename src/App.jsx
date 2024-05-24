import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminSideBar from './pages/admin/components/AdminSideBar';
import AdminDashboard from './pages/admin/AdminDashboard';
import ClerkManagement from './pages/admin/ClerkManagement';
import AddClerk from './pages/admin/components/AddClerk';

function App() {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <AdminSideBar />
                <div style={{ marginLeft: '250px', width: '100%' }}>
                    <Routes>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="/AdminDashboard" element={<AdminDashboard />} />
                        <Route path="/clerkManagement" element={<ClerkManagement />} />
                        <Route path="/AddClerk" element={<AddClerk />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
