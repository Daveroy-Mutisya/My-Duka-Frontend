import React, { useState } from 'react';
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
      const { access_token } = data; // Fix: Extract access_token from the response

      if (access_token) {
        localStorage.setItem('token', access_token);
        let decodedToken;
        try {
          decodedToken = jwtDecode(access_token);
        } catch (error) {
          console.error("Invalid token", error);
          return;
        }
        localStorage.setItem('role', decodedToken.sub.role);
        console.log(decodedToken.sub.role);

        if (decodedToken.sub.role === 'merchant') { // Fix: Corrected access to decoded role
          navigate('/merchant/dashboard');
        } else if (decodedToken.sub.role === 'admin') { // Fix: Corrected access to decoded role
          navigate('/admin/dashboard');
        } else if (decodedToken.sub.role === 'clerk') { // Fix: Corrected access to decoded role
          navigate('/clerk/dashboard');
        } else {
          throw new Error('Invalid role');
        }
      } else {
        console.error('Access token is missing in the response');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-primary-light'>
        <div className='flex flex-col p-6 h-auto w-[350px] md:w-[400px] md:h-auto bg-primary-light rounded-lg shadow-md'>
            {/* <img className='self-center mb-4 w-24 md:w-32' src={logo} alt="Logo" /> */}
            <h1 className='text-center mb-4 font-body text-xl font-bold text-Heading'>Welcome ToMyDuka!</h1>
            <p className='text-center text-base text-Heading mb-4'>{'Let\'s Keep the Momentum Going'}</p>
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
