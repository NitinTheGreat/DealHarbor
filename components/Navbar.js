'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "../styles/navStyle.css";
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
const Navbar = () => {
  const { cart, subTotal, addToCart, removeFromCart, clearCart } = useCart();
  const [activeLink, setActiveLink] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(!!token);
    setUsername(storedUsername || '');

    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    const showMenu = () => {
      navMenu.classList.add('show-menu');
    };

    const hideMenu = () => {
      navMenu.classList.remove('show-menu');
    };

    if (navToggle) {
      navToggle.addEventListener('click', showMenu);
    }

    if (navClose) {
      navClose.addEventListener('click', hideMenu);
    }

    const search = document.getElementById('search');
    const searchBtn = document.getElementById('search-btn');
    const searchClose = document.getElementById('search-close');

    const showSearch = () => {
      search.classList.add('show-search');
    };

    const hideSearch = () => {
      search.classList.remove('show-search');
    };

    if (searchBtn) {
      searchBtn.addEventListener('click', showSearch);
    }

    if (searchClose) {
      searchClose.addEventListener('click', hideSearch);
    }

    return () => {
      if (navToggle) {
        navToggle.removeEventListener('click', showMenu);
      }
      if (navClose) {
        navClose.removeEventListener('click', hideMenu);
      }
      if (searchBtn) {
        searchBtn.removeEventListener('click', showSearch);
      }
      if (searchClose) {
        searchClose.removeEventListener('click', hideSearch);
      }
    };
  }, []);

  useEffect(() => {
    const handleLogin = (event) => {
      if (event.detail && event.detail.token) {
        setIsLoggedIn(true);
        setUsername(localStorage.getItem('username') || '');
      }
    };

    window.addEventListener('userLoggedIn', handleLogin);

    return () => {
      window.removeEventListener('userLoggedIn', handleLogin);
    };
  }, []);

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      e.target.reset();
      setSearchTerm('');
      setIsSearchVisible(false); // Close the search modal
      router.push(`/allProducts?search=${searchTerm}`);
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
    setIsSidebarVisible(false); // Close the cart sidebar
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
                {/* <img src="../images/logo.png" alt="logo" />
                 */}
                 <Image
        src="/images/logo.png" // Path relative to the public folder
        alt="logo"
        width={150} // Replace with the appropriate width
        height={50} // Replace with the appropriate height
        priority // Ensure the image loads eagerly
        placeholder="blur" // Show a blurred placeholder while loading
        blurDataURL="/images/logo-blur.png" // Optional: Provide a low-res placeholder image
      />
                <h1>Deal Harbor</h1>
              </div>
            </Link>
          </div>
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link
                  href="/bicycles"
                  className={`nav__link ${activeLink === "bicycles" ? "active" : ""}`}
                  onClick={() => handleSetActiveLink("bicycles")}
                >
                  Bicycles
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/electronics"
                  className={`nav__link ${activeLink === "electronics" ? "active" : ""}`}
                  onClick={() => handleSetActiveLink("electronics")}
                >
                  Electronics
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/stationary"
                  className={`nav__link ${activeLink === "stationary" ? "active" : ""}`}
                  onClick={() => handleSetActiveLink("stationary")}
                >
                  Stationary
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/sell"
                  className={`nav__link ${activeLink === "sell" ? "active" : ""}`}
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
            <i className="ri-search-line nav__search" id="search-btn" onClick={toggleSearch} />
            {!isLoggedIn ? (
              <Link href="/Login" className="nav__login">
                <span>Login</span>
              </Link>
            ) : (
              <div
                className="nav__dropdown"
                onMouseEnter={handleDropdownToggle}
                onMouseLeave={() => {
                  if (!isSearchVisible) {
                    setShowDropdown(false);
                  }
                }}
              >
                <span className="nav__user-icon ri-user-line login-icon" />
                {showDropdown && (
                  <ul className="nav__dropdown-menu">
                    <li className="nav__dropdown-item">
                      <span>Welcome <span id="username">{username}</span></span>
                    </li>
                    <li className="nav__dropdown-item">
                      <Link href="/orders"><span>Your Orders</span></Link>
                    </li>
                    <li className="nav__dropdown-item">
                      <Link href="/sellings"><span>Your Sellings</span></Link>
                    </li>
                    <li className="nav__dropdown-item" onClick={handleLogout}>
                      <span>Logout</span>
                    </li>
                  </ul>
                )}
              </div>
            )}

            <i className="ri-shopping-cart-line nav__cart" id="Cart" onClick={toggleSidebar} />

            <div className="nav__toggle" id="nav-toggle">
              <i className="ri-menu-line" />
            </div>
          </div>
        </nav>
      </header>
      {/* Search Section */}
      <div className={`search ${isSearchVisible ? "show-search" : ""}`} id="search">
        <form action="" className="search__form" onSubmit={handleSearchSubmit}>
          <i className="ri-search-line search__icon" />
          <input
            type="search"
            placeholder="What are you looking for?"
            className="search__input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
        <i className="ri-close-line search__close" id="search-close" onClick={() => setIsSearchVisible(false)} />
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-[999999] flex w-full sm:w-[25vw] xs:w-[35vw] flex-col bg-background shadow-lg transition-transform transform ${isSidebarVisible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b bg-card px-6 py-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button className="rounded-full p-2 transition-colors hover:bg-muted" aria-label="Close cart" onClick={toggleSidebar}>
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {Object.keys(cart).length === 0 ? (
            <p className="text-center text-muted-foreground">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {Object.keys(cart).map((itemCode) => {
                const item = cart[itemCode];
                return (
                  <li
                    key={itemCode}
                    className="flex items-center justify-between space-x-4 border-b py-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-muted-foreground">
                          {item.qty} x ₹{item.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="rounded-full p-2 transition-colors hover:bg-muted"
                        aria-label="Decrease quantity"
                        onClick={() => removeFromCart(itemCode, 1, item.price, item.name, item.image)}
                      >
                        <AiFillMinusCircle className="h-5 w-5 text-pink-300" />
                      </button>
                      <span>{item.qty}</span>
                      <button
                        className="rounded-full p-2 transition-colors hover:bg-muted"
                        aria-label="Increase quantity"
                        onClick={() => addToCart(itemCode, 1, item.price, item.name, item.image)}
                      >
                        <AiFillPlusCircle className="h-5 w-5 text-pink-300" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="border-t bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Subtotal</p>
            <p className="text-2xl font-bold">
              ₹{subTotal}
              <span className="ml-2 text-lg font-normal text-muted-foreground">INR</span>
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              onClick={handleCheckout}
              className="flex-1 bg-primary text-primary-foreground transition-all hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 active:scale-95"
            >
              Checkout
            </Button>
            <Button
              onClick={clearCart}
              variant="outline"
              className="flex-1 transition-all hover:bg-muted focus:ring-2 focus:ring-muted/50 active:scale-95"
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

function XIcon(props) {
  return (
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default Navbar;
