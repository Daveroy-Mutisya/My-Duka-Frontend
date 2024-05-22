import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

const MerchantDashboard = () => {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [products, setProducts] = useState([]);
    const [payments, setPayments] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Fetch stores
        fetch(`${BASE_URL}/stores`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => setStores(data.stores))
        .catch(error => console.error('Error fetching stores:', error));
    }, []);

    const handleStoreSelect = (storeId) => {
        setSelectedStore(storeId);

        // Fetch products for the selected store
        fetch(`${BASE_URL}/store/${storeId}/products`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));

        // Fetch payments for the selected store
        fetch(`${BASE_URL}/store/${storeId}/payments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => setPayments(data))
        .catch(error => console.error('Error fetching payments:', error));

        // Fetch requests for the selected store
        fetch(`${BASE_URL}/store/${storeId}/requests`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => setRequests(data.requests))
        .catch(error => console.error('Error fetching requests:', error));
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Merchant Dashboard</h2>
            <div className="mb-4">
                <label htmlFor="store-select" className="block text-sm font-medium text-gray-700">Select Store</label>
                <select
                    id="store-select"
                    onChange={(e) => handleStoreSelect(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Select a store</option>
                    {stores.map((store) => (
                        <option key={store.id} value={store.id}>
                            {store.name}
                        </option>
                    ))}
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
                    <h3 className="text-xl font-bold mb-2">Payments</h3>
                    <ul>
                        {payments.map((payment) => (
                            <li key={payment.id}>{payment.method}: {payment.amount}</li>
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

export default MerchantDashboard;
