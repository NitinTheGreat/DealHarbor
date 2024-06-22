'use client';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setIsOpen(false); // Close the menu on mobile view after clicking a link
    };

    return (
        <nav className="relative bg-white shadow">
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <a href="#">
                            <img className="w-auto h-8 sm:h-7" src="/images/logo.jpg" alt="Logo" />
                        </a>

                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="text-gray-900 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                                aria-label="toggle menu"
                            >
                                {!isOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div
                        className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
                            isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full'
                        }`}
                    >
                        <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                            <a
                                href="#"
                                onClick={() => handleLinkClick('Join Slack')}
                                className={`px-3 py-2 mx-3 mt-2 text-gray-900 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-100 ${
                                    activeLink === 'Join Slack' ? 'underline' : ''
                                }`}
                            >
                                Join Slack
                            </a>
                            <a
                                href="#"
                                onClick={() => handleLinkClick('Browse Topics')}
                                className={`px-3 py-2 mx-3 mt-2 text-gray-900 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-100 ${
                                    activeLink === 'Browse Topics' ? 'underline' : ''
                                }`}
                            >
                                Browse Topics
                            </a>
                            <a
                                href="#"
                                onClick={() => handleLinkClick('Random Item')}
                                className={`px-3 py-2 mx-3 mt-2 text-gray-900 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-100 ${
                                    activeLink === 'Random Item' ? 'underline' : ''
                                }`}
                            >
                                Random Item
                            </a>
                            <a
                                href="#"
                                onClick={() => handleLinkClick('Experts')}
                                className={`px-3 py-2 mx-3 mt-2 text-gray-900 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-100 ${
                                    activeLink === 'Experts' ? 'underline' : ''
                                }`}
                            >
                                Experts
                            </a>
                        </div>

                        <div className="flex items-center mt-4 lg:mt-0">
                            <a
                                href="#"
                                className="hidden lg:block mx-4 text-gray-900 transition-colors duration-300 transform hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                                aria-label="view cart"
                            >
                                <img src="/images/cart.svg" alt="Cart" className="w-6 h-6" />
                            </a>

                            <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                    <img
                                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                                        className="object-cover w-full h-full"
                                        alt="avatar"
                                    />
                                </div>

                                <h3 className="mx-2 text-gray-900 lg:hidden">Khatab wedaa</h3>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
