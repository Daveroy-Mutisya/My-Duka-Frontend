import React, { useState } from 'react';

const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

const InviteAdmin = () => {
    const [email, setEmail] = useState('');
    const [storeId, setStoreId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleInvite = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            //this access the login endpoint to get the refresh token
            const loginResponse = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: 'myduka7@gmail.com', // i have used the merchant email and password to get the authorization
                    password: 'Merchant1@pass'
                })
            });
            const { refreshToken } = await loginResponse.json();

            //This uses the refresh token gotten from the login page to get the access token
            const refreshTokenResponse = await fetch(`${BASE_URL}/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken })
            });
            const { accessToken } = await refreshTokenResponse.json();

            //this sends the access token for auth allowing the merchant to send an invite to an admin
            const inviteResponse = await fetch(`${BASE_URL}/invite-admin`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    store_id: storeId
                })
            });

            if (!inviteResponse.ok) {
                throw new Error('Failed to invite admin');
            }

            // Display success message
            setMessage('Admin invited successfully');

            // Clear form fields after successful invite
            setEmail('');
            setStoreId('');
        } catch (error) {
            // Display error message
            setError(error.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Invite Admin</h2>
            <form onSubmit={handleInvite} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Admin Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="storeId" className="block text-sm font-medium text-gray-700">Store ID</label>
                    <input
                        type="text"
                        id="storeId"
                        value={storeId}
                        onChange={(e) => setStoreId(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400">
                        Send Invite
                    </button>
                </div>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default InviteAdmin;

