'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Inline SVG components for icons
const EyeOffIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

const MailIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const CircleIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, [router]);

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
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.name);
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

        setFormData({
          email: '',
          password: '',
        });

        const loginEvent = new CustomEvent('userLoggedIn', { detail: data });
        window.dispatchEvent(loginEvent);

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
      toast.error('Error logging in. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        style: { width: "auto", whiteSpace: "nowrap" }
      });
    }
  };

  useEffect(() => {
    const loginClose = document.getElementById('login-close');

    const hideLogin = () => {
      const login = document.getElementById('login');
      if (login) {
        login.classList.remove('show-login');
      }
    };

    if (loginClose) {
      loginClose.addEventListener('click', hideLogin);
    }

    return () => {
      if (loginClose) {
        loginClose.removeEventListener('click', hideLogin);
      }
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-8 animate-slide-in-right" id="login">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
              Welcome back!
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Sign in to your account and  get started.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                Email address
              </label>
              <div className="mt-1 animate-scale-in relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MailIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pl-10 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                Password
              </label>
              <div className="mt-1 animate-scale-in relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', border: 'none' }}
                >
                  <EyeOffIcon className="w-5 h-5 text-muted-foreground" />
                  <span className="sr-only">Toggle password visibility</span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                  Remember me
                </label>
              </div>
              
            </div>
            <div>
            <button
  type="submit"
  className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-400 py-2 px-4 text-sm font-medium text-background shadow-sm ring-1 ring-pink-200 ring-offset-2 transition-transform duration-150 ease-in-out hover:bg-pink-300 hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
>
  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
    {/* <CircleIcon className="w-5 h-5 text-background" /> */}
  </span>
  Sign in
</button>
<div className="mt-4 text-center text-sm">
  <p className="text-muted-foreground">
    Don&apos;t have an account?{' '}
    <Link href="/Signup" className="font-medium text-pink-500 hover:text-pink-600">
      Sign Up
    </Link>
  </p>
</div>

            </div>
          </form>
          
        </div>
      </div>
    </>
  );
};

export default Login;
