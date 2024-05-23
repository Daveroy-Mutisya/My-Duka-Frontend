// src/pages/Auth/Login.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const refreshToken = useRef(async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const response = await fetch('https://deploying-myduka-backend.onrender.com/refresh-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Error: ' + response.statusText);
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const expiresIn = decodedToken.exp * 1000 - new Date().getTime();
        setTimeout(refreshToken.current, expiresIn - 60000);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://deploying-myduka-backend.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error logging in');
      }

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        const decodedToken = jwtDecode(data.access_token);
        localStorage.setItem('role', decodedToken.role);

        if (decodedToken.role === 'merchant') {
          navigate('/merchant/dashboard');
        } else if (decodedToken.role === 'admin') {
          navigate('/admin/dashboard');
        }
        else if (decodedToken.role === 'clerk') {
          navigate('/clerk/dashboard');
        }  else {
          throw new Error('Invalid role');
        }
      } else {
        console.error('Access token is missing in the response');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-primary-light'>
      <div className='flex flex-col p-6 h-auto w-[350px] md:w-[400px] md:h-auto bg-primary-light rounded-lg shadow-md'>
        {/* <img className='self-center mb-4 w-24 md:w-32' alt="Logo" /> */}
        <h1 className='text-center mb-4 font-body text-xl font-bold text-Heading'>Welcome To MyDuka</h1>
        <form className='flex flex-col space-y-6' onSubmit={handleSubmit}>
          <input
            className='border p-2 rounded-[8px] outline-none text-Heading'
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className='relative border p-2 rounded-[8px]'>
            <input
              className=' text-Heading pr-10 outline-none'
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
              {passwordVisible ? (
                <PiEyeLight className='fill-Heading' onClick={togglePasswordVisibility} />
              ) : (
                <PiEyeSlash className='fill-Heading' onClick={togglePasswordVisibility} />
              )}
            </div>
          </div>
          <button
            className='bg-black text-primary-light p-2 rounded-[8px] mt-4'
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
