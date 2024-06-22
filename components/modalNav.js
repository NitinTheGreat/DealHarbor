'use client';
import { useState, useEffect, useRef } from 'react';

const PaymentDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="flex items-center justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700 bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                    id="options-menu"
                    onClick={toggleDropdown}
                >
                    Buy Now
                    <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 -mr-1 h-5 w-5"
                        aria-hidden="true"
                    >
                        <path
                            fill="currentColor"
                            d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"
                        />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div
                    className="absolute left-0 mt-2 w-full sd:static md:left-auto bg-gray-400 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                    style={{ minWidth: 'max-content' }}
                    ref={dropdownRef}
                >
                    <div className="py-1 z-50 bg-red-200" role="menu" aria-labelledby="options-menu">
                        <a
                            href="#"
                            className="block px-4  py-2  z-50 text-md text-black hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            <span className="flex flex-col z-50">
                                <span className="lg:hidden">Bicycles</span>
                                <span className="hidden lg:flex">Shop Bicycles</span>
                            </span>
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-md  z-50 text-black hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            <span className="flex flex-col">
                                <span className="lg:hidden">Electronics</span>
                                <span className="hidden lg:flex">Shop Electronics</span>
                            </span>
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-md  z-50 text-black hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            <span className="flex flex-col">
                                <span className="lg:hidden">Stationery</span>
                                <span className="hidden lg:flex">Shop Stationery</span>
                            </span>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentDropdown;
