export const BASE_URL='https://deploying-myduka-backend.onrender.com';


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useClerk } from "@clerk/clerk-react";
import { BASE_URL } from './config';  

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const clerk = useClerk();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const newProduct = { name, description, price };
      await axios.post(`${BASE_URL}/products`, newProduct);
      setProducts([...products, newProduct]);
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <form onSubmit={handleAddProduct}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
