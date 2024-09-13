// src/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-orange-600 text-white py-4 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Construction Material Management System</h1>
        <nav>
          <a href="/" className="text-white hover:text-gray-300 mx-2">Home</a>
          <a href="/about" className="text-white hover:text-gray-300 mx-2">About</a>
          <a href="/contact" className="text-white hover:text-gray-300 mx-2">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
