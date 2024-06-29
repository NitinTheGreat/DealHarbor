// pages/Login.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "../styles/navStyle.css";
import { Router } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
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
    console.log('Form data:', formData);
    console.log("JSON form data", JSON.stringify(formData));

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
        toast.success('Login Successful', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          style: { width: "auto", whiteSpace: "nowrap" }
        });
        

        // Redirect to dashboard or another page
        // Router.push('/');
        
       
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
    const login = document.getElementById("login");
    const loginBtn = document.getElementById("login-btn");
    const loginClose = document.getElementById("login-close");

    const showLogin = () => {
      login.classList.add("show-login");
    };

    const hideLogin = () => {
      login.classList.remove("show-login");
    };

    if (loginBtn) {
      loginBtn.addEventListener("click", showLogin);
    }

    if (loginClose) {
      loginClose.addEventListener("click", hideLogin);
    }

    // Cleanup event listeners on unmount
    return () => {
      if (loginBtn) {
        loginBtn.removeEventListener("click", showLogin);
      }
      if (loginClose) {
        loginClose.removeEventListener("click", hideLogin);
      }
    };
  }, []);

  return (
    <div className="login" id="login">
       <ToastContainer /> 
      <form onSubmit={handleSubmit} className="login__form">
        <h2 className="login__title">Log In</h2>
        <div className="login__group">
          <div>
            <label htmlFor="email" className="login__label">
              Email
            </label>
            <input
              type="email"
              placeholder="Write your email"
              id="email"
              className="login__input"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="login__label">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              className="login__input"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* {errorMessage && (
          <div className="login__error">{errorMessage}</div>
        ) } */}
        {
          errorMessage ? <div className="login__error">{errorMessage}</div> : null
        }
        
        <div>
          <p className="login__signup">
            You do not have an account?{' '}
            <Link href="/Signup">
              Sign up
            </Link>
          </p>
          <Link href="/ForgotPassword" className="login__forgot">
            Forgot your password?
          </Link>
          <button type="submit" className="login__button" id="login-btn">
            Log In
          </button>
        </div>
      </form>
      <i className="ri-close-line login__close" id="login-close" />
    </div>
  );
};

export default Login;
