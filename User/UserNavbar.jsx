// src/UserNavbar.jsx
import React from 'react';
import { FaUser, FaShoppingCart, FaListAlt, FaSignOutAlt, FaPhone, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserNavbar = () => {
  return (
    <nav className="bg-orange-600 text-white p-4 flex items-center justify-between shadow-md">
      {/* CMS Name */}
      <div className="text-xl font-bold ml-4">
        <Link to="/" className="text-white hover:text-gray-300">
          Construction Materials Management System
        </Link>
      </div>

      {/* Right Side Links */}
      <div className="flex items-center space-x-4 mr-4">
        {/* Contact Icon */}
        <Link to="/contact" className="flex items-center space-x-2 hover:text-gray-300">
          <FaPhone className="text-xl" />
          <span>Contact</span>
        </Link>

        {/* About Icon */}
        <Link to="/about" className="flex items-center space-x-2 hover:text-gray-300">
          <FaInfoCircle className="text-xl" />
          <span>About</span>
        </Link>
        
        {/* User Profile Icon */}
        <Link to="/profile" className="flex items-center space-x-2 hover:text-gray-300">
          <FaUser className="text-xl" />
          <span>Profile</span>
        </Link>

        {/* Cart Icon */}
        <Link to="/cart" className="flex items-center space-x-2 hover:text-gray-300">
          <FaShoppingCart className="text-xl" />
          <span>Cart</span>
        </Link>

        {/* My Orders Icon */}
        <Link to="/orders" className="flex items-center space-x-2 hover:text-gray-300">
          <FaListAlt className="text-xl" />
          <span>My Orders</span>
        </Link>

        {/* Logout Button */}
        <button className="flex items-center space-x-2 hover:text-gray-300">
          <FaSignOutAlt className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
