// export const BASE_URL='https://deploying-myduka-backend.onrender.com';


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useClerk } from "@clerk/clerk-react";
// import { BASE_URL } from './config';  

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const clerk = useClerk();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/products`);
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const newProduct = { name, description, price };
//       await axios.post(`${BASE_URL}/products`, newProduct);
//       setProducts([...products, newProduct]);
//       setName('');
//       setDescription('');
//       setPrice('');
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Products</h1>
//       <form onSubmit={handleAddProduct}>
//         <div>
//           <label>Product Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <input
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Price:</label>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Add Product</button>
//       </form>
//       <div>
//         {products.map((product) => (
//           <div key={product.id}>
//             <h2>{product.name}</h2>
//             <p>{product.description}</p>
//             <p>${product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;


import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import clsx from 'clsx';

export default function NewClerkForm() {
  return (
    <StyledDiv>
      <FormControl defaultValue="" required>
        <Label>Product Name</Label>
        <StyledInput placeholder="Product Name" />
        <Label>Price</Label>
        <StyledInput placeholder="Price" />
        <Label>Stock Quantity</Label>
        <StyledInput placeholder="Stock Quantity" />
        <Label>Buying Price</Label>
        <StyledInput placeholder="Buying Price" />
        <Label>Selling Price</Label>
        <StyledInput placeholder="Selling Price" />
        <Label>Store ID</Label>
        <StyledInput placeholder="Store ID" />
        <Label>Image URL (from Google)</Label>
        <StyledInput placeholder="Image URL (from Google)" />
        <HelperText />
        <Button variant="contained" disableElevation>
          Submit
        </Button>
      </FormControl>
    </StyledDiv>
  );
}

const StyledDiv = styled('div')`
  background-color: #DAECFF;
  padding: 16px;
  max-width: 360px;
  margin: auto;
  border-radius: 8px;
  box-sizing: border-box;
  max-height: 90vh; /* Ensure the container fits within the viewport */
  overflow-y: auto; /* Make the container scrollable */

  /* Hide the scrollbar initially */
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: transparent transparent; /* For Firefox */

  &::-webkit-scrollbar {
    width: 8px; /* Set the width of the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* Make scrollbar thumb transparent */
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* Show scrollbar thumb on hover */
  }

  &:hover::-webkit-scrollbar {
    width: 8px; /* Show scrollbar on hover */
  }

  /* Ensure it works on older versions of Safari and other webkit browsers */
  &::-webkit-scrollbar-track {
    background: transparent; /* Make scrollbar track transparent */
  }
`;

const StyledInput = styled(Input)(
  ({ theme }) => `
  .${inputClasses.input} {
    width: 100%;
    max-width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${grey[200]};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    &:hover {
      border-color: ${blue[400]};
    }
    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
    margin-bottom: 12px;
    box-sizing: border-box;
  }
`,
);

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
      {children}
      {required ? ' *' : ''}
    </p>
  );
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = 'https://deploying-myduka-backend.onrender.com'; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

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
      const response = await axios.post(`${BASE_URL}/products`, newProduct);
      setProducts([...products, response.data]);
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


