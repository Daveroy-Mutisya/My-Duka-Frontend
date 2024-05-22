import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

const ClerkDashboard = () => {
    const [products, setProducts] = useState([]);
    const [requests, setRequests] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        if (selectedStore) {
            // Fetch products for the selected store
            fetch(`${BASE_URL}/store/${selectedStore}/products`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));

            // Fetch requests for the selected store
            fetch(`${BASE_URL}/store/${selectedStore}/requests`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => response.json())
            .then(data => setRequests(data.requests))
            .catch(error => console.error('Error fetching requests:', error));
        }
    }, [selectedStore]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Clerk Dashboard</h2>
            <div className="mb-4">
                <label htmlFor="store-select" className="block text-sm font-medium text-gray-700">Select Store</label>
                <select
                    id="store-select"
                    onChange={(e) => setSelectedStore(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Select a store</option>
                    {/* Fetch and display list of stores */}
                </select>
            </div>
            {selectedStore && (
                <div>
                    <h3 className="text-xl font-bold mb-2">Products</h3>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                    <h3 className="text-xl font-bold mb-2">Requests</h3>
                    <ul>
                        {requests.map((request) => (
                            <li key={request.id}>
                                {request.product_name} - {request.quantity} - {request.status}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ClerkDashboard;
