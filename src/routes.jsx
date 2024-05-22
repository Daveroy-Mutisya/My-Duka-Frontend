import { Login } from './pages/Auth/login';
import {RegisterAdmin} from './pages/Auth/RegisterAdmin';
import { Merchant_Dashboard } from './pages/merchant/MerchantDashboard';
import { Clerk_Dashboard } from './pages/clerk/ClerkDashboard';
import { Admin_Dashboard } from './pages/admin/AdminDashboard';


const routes = [
    {
        path: "/signin",
        Element: Login,
        isAuthenticated: false,
        layout: "None",
        role: null,
        Sidebar: null,
    },
    {
        path: "/store/:id/register-admin",
        Element: () => (
        <RegisterAdmin />
        ),
        isAuthenticated: true,
        role: null,
    },
    {
        path: "/merchant/dashboard",
        Element: () => (
            <Merchant_Dashboard />
 
        ),
        isAuthenticated: true,
        role: "merchant",
    },
    {
        path: "/clerk/dashboard",
        Element: () => (
            <Clerk_Dashboard />
 
        ),
        isAuthenticated: true,
        role: "clerk",
    },
    {
        path: "/admin/dashboard",
        Element: () => (
            <Admin_Dashboard />
 
        ),
        isAuthenticated: true,
        role: "admin",
    },
];



export default routes;