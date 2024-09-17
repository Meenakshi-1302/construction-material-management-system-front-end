// src/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          
          <Link to="/">Construction Material Management</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/login" className="hover:bg-gray-700 px-3 py-2 rounded-md">About</Link>
          <Link to="/login" className="hover:bg-gray-700 px-3 py-2 rounded-md">Contact</Link>
          <Link to="/login" className="hover:bg-gray-700 px-3 py-2 rounded-md">Login</Link>
          <Link to="/signup" className="bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded-md font-semibold">Sign Up</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center px-2 py-1 border rounded-lg border-gray-600 hover:bg-gray-700"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-black text-white absolute top-16 left-0 w-full ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="flex flex-col items-center space-y-4 py-4">
          <Link to="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md" onClick={toggleMenu}>About</Link>
          <Link to="/contact" className="hover:bg-gray-700 px-3 py-2 rounded-md" onClick={toggleMenu}>Contact</Link>
          <Link to="/login" className="hover:bg-gray-700 px-3 py-2 rounded-md" onClick={toggleMenu}>Login</Link>
          <Link to="/signup" className="bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded-md font-semibold" onClick={toggleMenu}>Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
