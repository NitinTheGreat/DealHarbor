'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../styles/navStyle.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navClose = document.getElementById("nav-close");

    const showMenu = () => {
      navMenu.classList.add("show-menu");
    };

    const hideMenu = () => {
      navMenu.classList.remove("show-menu");
    };

    if (navToggle) {
      navToggle.addEventListener("click", showMenu);
    }

    if (navClose) {
      navClose.addEventListener("click", hideMenu);
    }

    const search = document.getElementById("search");
    const searchBtn = document.getElementById("search-btn");
    const searchClose = document.getElementById("search-close");

    const showSearch = () => {
      search.classList.add("show-search");
    };

    const hideSearch = () => {
      search.classList.remove("show-search");
    };

    if (searchBtn) {
      searchBtn.addEventListener("click", showSearch);
    }

    if (searchClose) {
      searchClose.addEventListener("click", hideSearch);
    }

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
      if (navToggle) {
        navToggle.removeEventListener("click", showMenu);
      }
      if (navClose) {
        navClose.removeEventListener("click", hideMenu);
      }
      if (searchBtn) {
        searchBtn.removeEventListener("click", showSearch);
      }
      if (searchClose) {
        searchClose.removeEventListener("click", hideSearch);
      }
      if (loginBtn) {
        loginBtn.removeEventListener("click", showLogin);
      }
      if (loginClose) {
        loginClose.removeEventListener("click", hideLogin);
      }
    };
  }, []);

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/3.5.0/remixicon.css"
      />

      <header className="header" id="header">
        <nav className="nav container">
          <Link href="/" className="nav__logo">
            <div className="logo">
              <img src="../images/logo.png" alt="logo" />
              <h1>Deal Harbor</h1>
            </div>
          </Link>
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link
                  href="/bicycles"
                  className={`nav__link ${
                    activeLink === "bicycles" ? "active" : ""
                  }`}
                  onClick={() => handleSetActiveLink("bicycles")}
                >
                  Bicycles
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/electronics"
                  className={`nav__link ${
                    activeLink === "electronics" ? "active" : ""
                  }`}
                  onClick={() => handleSetActiveLink("electronics")}
                >
                  Electronics
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/stationary"
                  className={`nav__link ${
                    activeLink === "stationary" ? "active" : ""
                  }`}
                  onClick={() => handleSetActiveLink("stationary")}
                >
                  Stationary
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/sell"
                  className={`nav__link ${
                    activeLink === "sell" ? "active" : ""
                  }`}
                  onClick={() => handleSetActiveLink("sell")}
                >
                  Sell Item
                </Link>
              </li>
            </ul>
            <div className="nav__close" id="nav-close">
              <i className="ri-close-line" />
            </div>
          </div>
          <div className="nav__actions">
            <i className="ri-search-line nav__search" id="search-btn" />
            <i className="ri-user-line nav__login" id="login-btn" />
            <i className="ri-shopping-cart-line nav__cart" id="Cart" />

            <div className="nav__toggle" id="nav-toggle">
              <i className="ri-menu-line" />
            </div>
          </div>
        </nav>
      </header>
      <div className="search" id="search">
        <form action="" className="search__form">
          <i className="ri-search-line search__icon" />
          <input
            type="search"
            placeholder="What are you looking for?"
            className="search__input"
          />
        </form>
        <i className="ri-close-line search__close" id="search-close" />
      </div>
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
              You do not have an account? <Link href="#">Sign up</Link>
            </p>
            <Link href="#" className="login__forgot">
              You forgot your password
            </Link>
            <button type="submit" className="login__button">
              Log In
            </button>
          </div>
        </form>
        <i className="ri-close-line login__close" id="login-close" />
      </div>
    </>
  );
};

export default Navbar;
