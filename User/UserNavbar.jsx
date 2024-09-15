// src/UserNavbar.jsx
import React, { useEffect } from 'react';
import {FaHome,  FaUser, FaShoppingCart, FaListAlt, FaSignOutAlt, FaPhone, FaInfoCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const UserNavbar = () => {
  const navigate = useNavigate();
  const { totalItems } = useSelector((state) => state.cart); // Get cart item count from Redux
  const id = sessionStorage.getItem('userid');

  useEffect(() => {
    if(id==null){
      navigate('/');
    }
})

  const handleLogout = () => {
    // Perform any logout logic here if necessary (e.g., clear auth tokens)
    localStorage.removeItem('cartState');
    sessionStorage.clear();
    // Navigate to the landing page
    navigate('/');
  };
  const handleNavigation = (path) => {
    navigate(path);
  };

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
      <div className="flex items-center space-x-6">
        {/* Home Icon */}
        <button onClick={() => handleNavigation('/home')} className="flex items-center space-x-2 hover:text-gray-400">
          <FaHome className="text-xl" />
          <span className="hidden md:inline">Home</span>
        </button>

        {/* User Profile Icon */}
        <button onClick={() => handleNavigation('/userprofile-page')} className="flex items-center space-x-2 hover:text-gray-400">
          <FaUser className="text-xl" />
          <span className="hidden md:inline">Profile</span>
        </button>

        {/* Cart Icon */}
        <button onClick={() => handleNavigation('/cart')} className="flex items-center space-x-2 hover:text-gray-400">
          <FaShoppingCart className="text-xl" />
          <span className="hidden md:inline">Cart ({totalItems})</span> {/* Display totalItems */}
        </button>

        {/* Contact Icon */}
        <button onClick={() => handleNavigation('/contact')} className="flex items-center space-x-2 hover:text-gray-400">
          <FaPhone className="text-xl" />
          <span className="hidden md:inline">Contact</span>
        </button>

        {/* About Icon */}
        <button onClick={() => handleNavigation('/about')} className="flex items-center space-x-2 hover:text-gray-400">
          <FaInfoCircle className="text-xl" />
          <span className="hidden md:inline">About</span>
        </button>
        
        {/* Your Orders Icon */}
        <button onClick={() => handleNavigation('/orders')} className="flex items-center space-x-2 hover:text-gray-400">
          <FaListAlt className="text-xl" />
          <span className="hidden md:inline">Your Orders</span>
        </button>
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-gray-400">
        <FaSignOutAlt className="text-xl" />
        <span className="hidden md:inline">Logout</span>
      </button>

        
        
        

       

       

       
      </div>
    </nav>
  );
};

export default UserNavbar;
