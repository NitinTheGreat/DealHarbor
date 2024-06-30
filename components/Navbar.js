// components/Navbar.js

'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../styles/navStyle.css";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { useCart } from "../context/CartContext";
import Login from "./Login"; // Import the Login component

const Navbar = () => {
  const { cart, subTotal, addToCart, removeFromCart, clearCart } = useCart();
  const [activeLink, setActiveLink] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

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
    };
  }, []);

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
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
          <div className="logoboth">
          <Link href="/" className="nav__logo">
            <div className="logo">
              <img src="../images/logo.png" alt="logo" />
              <h1>Deal Harbor</h1>
            </div>
          </Link>
          </div>
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link
                  href="/bicycles"
                  className={`nav__link ${activeLink === "bicycles" ? "active" : ""
                    }`}
                  onClick={() => handleSetActiveLink("bicycles")}
                >
                  Bicycles
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/electronics"
                  className={`nav__link ${activeLink === "electronics" ? "active" : ""
                    }`}
                  onClick={() => handleSetActiveLink("electronics")}
                >
                  Electronics
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/stationary"
                  className={`nav__link ${activeLink === "stationary" ? "active" : ""
                    }`}
                  onClick={() => handleSetActiveLink("stationary")}
                >
                  Stationary
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/sell"
                  className={`nav__link ${activeLink === "sell" ? "active" : ""
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
            <i className="ri-shopping-cart-line nav__cart" id="Cart" onClick={toggleSidebar} />

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

      {/* card sidebar */}
      <div
        className={`sidebar ${isSidebarVisible ? "show" : ""
          }`}
      >
        <h2 className="font-bold text-xl p-4">Your Cart</h2>
        <span
          className="close-icon cart-close"
          onClick={toggleSidebar}
        >
          <i className="ri-close-line" />
        </span>

        <ol className=" list-decimal font-semibold pl-8">
          {Object.keys(cart).map((itemCode) => { 
            const item = cart[itemCode];
            return (
              <li key={itemCode}>
                <div className=" item flex my-5">
                  <div className=" w-2/3 font-semibold">
                    {item.name}
                  </div>
                  <div className=" flex font-semibold items-center justify-center w-1/3 text-lg">
                    <AiFillMinusCircle className="cursor-pointer text-purple-400"
                      onClick={() => removeFromCart(itemCode, 1)} />
                    <span className=" mx-2 text-sm">{item.qty}</span>
                    <AiFillPlusCircle className="cursor-pointer text-purple-400"
                      onClick={() => addToCart(itemCode, item.price, 1, item.name)} />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="bottom">
          <div className="subtotal">
            <span className="total">Subtotal:</span>
            <span className="price">₹{subTotal}</span>
          </div>
          <button className="button">
            <div className="default-btn flex items-center">
              <svg
                className="css-i6dzq1"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                strokeWidth="2"
                stroke="#FFF"
                height="20"
                width="20"
                viewBox="0 0 24 24"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle r="3" cy="12" cx="12"></circle>
              </svg>
              <span className="ml-2">Shop Now</span>
            </div>
            <div className="hover-btn flex items-center">
              <svg
                className="css-i6dzq1"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                strokeWidth="2"
                stroke="#ffd300"
                height="20"
                width="20"
                viewBox="0 0 24 24"
              >
                <circle r="1" cy="21" cx="9"></circle>
                <circle r="1" cy="21" cx="20"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <Link href={"/checkout"}> <span className="ml-2">Checkout</span>  </Link>
            </div>
          </button>
        
        

        <button onClick={() => clearCart()} className="btn"> Clear Cart
        </button>
        </div>

      </div>

      {/* Render the Login component */}
      <Login />
    </>
  );
};

export default Navbar;
