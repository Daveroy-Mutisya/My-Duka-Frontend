import React from "react";
import { Link } from 'react-router-dom'; // Import Link from React Router

export default function Tables() {
  const imageSrc = "path_to_image"; // replace with the actual image source

  const tableData = {
    columns: [
      { Header: "name", accessor: "name", width: "20%", textAlign: "left" },
      { Header: "price", accessor: "price", width: "15%", textAlign: "right" },
      { Header: "stock_quantity", accessor: "stock_quantity", width: "15%", textAlign: "center" },
      { Header: "buying_price", accessor: "buying_price", width: "15%", textAlign: "right" },
      { Header: "selling_price", accessor: "selling_price", width: "15%", textAlign: "right" },
      { Header: "store_id", accessor: "store_id", width: "10%", textAlign: "center" },
      { Header: "image", accessor: "image", width: "10%", textAlign: "center" },
    ],
    rows: Array.from({ length: 6 }, (_, index) => ({
      name: (
        <a href="#" style={{ color: "black", fontWeight: "bold", textDecoration: "none" }}>
          Product Name
        </a>
      ),
      price: (
        <span style={{ color: "black", fontWeight: "bold" }}>$99.99</span>
      ),
      stock_quantity: (
        <span style={{ color: "black", fontWeight: "bold" }}>100</span>
      ),
      buying_price: (
        <span style={{ color: "black", fontWeight: "bold" }}>$50.00</span>
      ),
      selling_price: (
        <span style={{ color: "black", fontWeight: "bold" }}>$99.99</span>
      ),
      store_id: (
        <span style={{ color: "black", fontWeight: "bold" }}>Store_123</span>
      ),
      image: <img src={imageSrc} alt="product image" width="50px" />,
    })),
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#2196f3", color: "white", padding: "10px", borderRadius: "5px" }}>
          <div style={{ fontWeight: "bold" }}>My Products</div>
          {/* Use Link instead of anchor tag */}
          <Link to="/AddClerk" style={{ textDecoration: "none" }}>
            <button style={{ cursor: "pointer", backgroundColor: "#1976d2", color: "white", border: "none", padding: "8px 20px", borderRadius: "5px", outline: "none" }}>
              Add Product
            </button>
          </Link>
        </div>
      </div>
      <div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {tableData.columns.map((column, index) => (
                <th key={index} style={{ textAlign: column.textAlign }}>{column.Header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {tableData.columns.map((column, colIndex) => (
                  <td key={colIndex} style={{ textAlign: column.textAlign }}>{row[column.accessor]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
