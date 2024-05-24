import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

export default function Tables() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "100%",
      overflowX: "hidden"
    },
    header: {
      marginBottom: "20px",
    },
    headerInner: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#2196f3",
      color: "white",
      padding: "10px",
      borderRadius: "5px"
    },
    button: {
      cursor: "pointer",
      textDecoration: "none"
    },
    table: {
      backgroundColor: "#f5f5f5",
    },
    tableHeader: {
      backgroundColor: "#e0e0e0",
    },
    tableCell: {
      color: "#333",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <div style={{ fontWeight: "bold" }}>My Products</div>
          <Link to="/AddClerk" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#007FFF",
                color: "white",
                borderRadius: "8px",
                padding: "8px 16px",
                '&:hover': {
                  backgroundColor: "#0066CC"
                }
              }}
            >
              Add Product
            </Button>
          </Link>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={styles.table} aria-label="simple table">
          <TableHead sx={styles.tableHeader}>
            <TableRow>
              <TableCell sx={styles.tableCell}>Name</TableCell>
              <TableCell align="right" sx={styles.tableCell}>Price ($)</TableCell>
              <TableCell align="right" sx={styles.tableCell}>Stock Quantity</TableCell>
              <TableCell align="right" sx={styles.tableCell}>Buying Price ($)</TableCell>
              <TableCell align="right" sx={styles.tableCell}>Selling Price ($)</TableCell>
              <TableCell align="right" sx={styles.tableCell}>Store ID</TableCell>
              <TableCell align="center" sx={styles.tableCell}>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={styles.tableCell}>
                  {product.name}
                </TableCell>
                <TableCell align="right" sx={styles.tableCell}>{product.price}</TableCell>
                <TableCell align="right" sx={styles.tableCell}>{product.stock_quantity}</TableCell>
                <TableCell align="right" sx={styles.tableCell}>{product.buying_price}</TableCell>
                <TableCell align="right" sx={styles.tableCell}>{product.selling_price}</TableCell>
                <TableCell align="right" sx={styles.tableCell}>{product.store_id}</TableCell>
                <TableCell align="center" sx={styles.tableCell}>
                  <img src={product.image} alt="product" width="50px" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
