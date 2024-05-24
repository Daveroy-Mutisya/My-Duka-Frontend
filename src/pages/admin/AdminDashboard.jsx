import React from 'react';
import AdminSideBar from './components/AdminSideBar';

const AdminDashboard = () => {
    return (
        <div style={{ display: 'flex' }}>
            <AdminSideBar />
            <div style={{
                marginLeft: '250px',
                padding: '2rem',
                width: '100%'
            }}>
                <h1>Dashboard</h1>
                {/* Dashboard content goes here */}
            </div>
        </div>
    );
};

export default AdminDashboard;
