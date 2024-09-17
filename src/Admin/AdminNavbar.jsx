// src/Admin/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const AdminNavbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    // Implement any additional logout logic here
    console.log('Logout clicked');

    // Redirect to the landing page (e.g., '/')
    navigate('/');
  };

  return (
    <nav className="bg-orange-500 text-black fixed top-0 left-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4 max-w-screen-xl">
      <h1 className="text-xl font-bold">CMS</h1>
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="flex items-center text-black hover:text-gray-800 transition-colors">
            <FaUserCircle className="text-2xl" />
            <span className="ml-2 hidden md:inline">Profile</span>
          </Link>
          <button
            onClick={handleLogout} // Call handleLogout on button click
            className="flex items-center text-black hover:text-gray-800 transition-colors"
          >
            <FaSignOutAlt className="text-2xl" />
            <span className="ml-2 hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
