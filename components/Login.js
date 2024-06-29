'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import "../styles/navStyle.css";

const Login = () => {
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
      <form action="" className="login__form">
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
            />
          </div>
        </div>
        <div>
          <p className="login__signup">
            You do not have an account?{' '}
            <a href="/Signup" >
              Sign up
            </a>
          </p>
          <Link href="/Signup" className="login__forgot">
            You forgot your password
          </Link>
          <button type="submit" className="login__button">
            Log In
          </button>
        </div>
      </form>
      <i className="ri-close-line login__close" id="login-close" />
    </div>
  );
};

export default Login;