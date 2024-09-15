import React from 'react';
import { useNavigate } from 'react-router-dom';

const SupplierNavbar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/'); // Adjust the route as needed
  };

  const handleLogout = () => {
    // Clear session storage or perform any necessary logout operations
    sessionStorage.clear();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-orange-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        Construction Management System
      </div>
      <div className="space-x-4">
        <button
          onClick={handleHome}
          className="bg-orange-400 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          Home
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-800 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default SupplierNavbar;
