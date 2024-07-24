'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

const router = useRouter();
 useEffect(() => {
   if(localStorage.getItem('token')){
    router.push('/')
   }
 
   
 }, [])
 

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
 

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data.message);
        localStorage.clear();
        
        // Store the token and username in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.name); // Assuming the backend sends 'name' in the response
        localStorage.setItem('email', data.email);
  
        toast.success('Login Successful', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          style: { width: "auto", whiteSpace: "nowrap" }
        });
  
        // Clear form data
        setFormData({
          email: '',
          password: '',
        });
  
        setTimeout(() => {
          router.push('/');
        }, 2000);
        
      } else {
        const errorData = await response.json();
        toast.error(errorData.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          style: { width: "auto", whiteSpace: "nowrap" }
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Error logging in. Please try again.'); // Generic error message
    }
  };
  

  useEffect(() => {
    const loginClose = document.getElementById("login-close");

    const hideLogin = () => {
      const login = document.getElementById("login");
      if (login) {
        login.classList.remove("show-login");
      }
    };

    if (loginClose) {
      loginClose.addEventListener("click", hideLogin);
    }

    // Cleanup event listeners on unmount
    return () => {
      if (loginClose) {
        loginClose.removeEventListener("click", hideLogin);
      }
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center h-screen">
        <div className="container px-6 py-24 mx-auto lg:py-32">
          <div className="lg:flex">
            <div className="lg:w-1/2">
              <a href="/" title="Kutty Home Page" className="flex items-center justify-start">
                <svg className="w-auto h-7 sm:h-8" width="86" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 335 93">
                  {/* SVG Path omitted for brevity */}
                </svg>
                <span className="sr-only">Kutty</span>
              </a>
              <h1 className="mt-4 text-gray-600 md:text-lg">Welcome back</h1>
              <h1 className="mt-4 text-2xl font-medium text-gray-800 capitalize lg:text-3xl">
                Login to your account
              </h1>
            </div>

            <div className="mt-8 lg:w-1/2 lg:mt-0">
              <form className="w-full lg:max-w-xl" onSubmit={handleSubmit}>
                <div className="relative flex items-center">
                  <span className="absolute left-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    className="block w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring"
                    id="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="relative flex items-center mt-4">
                  <span className="absolute left-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    className="block w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {
                  errorMessage ? <div className="text-red-500">{errorMessage}</div> : null
                }

                <div className="mt-8 md:flex md:items-center">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Sign in
                  </button>

                  <Link href="/Signup" className="inline-block mt-4 text-center text-blue-500 md:mt-0 md:mx-6 hover:underline">
                    Do not have an account? Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-8 md:mt-24 sm:flex sm:items-center">
            <h3 className="text-blue-500 sm:w-1/2">Social networks</h3>

            <div className="flex items-center mt-4 sm:mt-0 -mx-1.5 sm:w-1/2">
              <a className="mx-1.5 text-gray-400 hover:text-blue-500 transition-colors duration-300 transform" href="#">
                <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0z" />
                  {/* Add the actual SVG path for the social media icon */}
                </svg>
              </a>

              {/* Add more social media icons as needed */}
            </div>
          </div>
        </div>
      </div>

      <div id="login-close" className="w-4 h-4 m-4 text-red-500 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 m-4 text-red-500 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 1a9 9 0 110 18a9 9 0 010-18zm1.293 5.293a1 1 0 00-1.414 0L10 8.586L8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 000-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </>
  );
};

export default Login;
