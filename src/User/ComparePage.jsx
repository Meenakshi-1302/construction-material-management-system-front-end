// src/ComparePage.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import AdminNavbar from '../Admin/AdminNavbar';
import UserNavbar from './UserNavbar';

const ComparePage = () => {
  const compareList = useSelector(state => state.compare.items);
  const navigate = useNavigate();

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h2 className="text-xl font-semibold">No materials added to compare.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
        <UserNavbar/><br/>
      <div className="bg-orange-600 text-white py-4">
        <div className="max-w-8xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Compare Materials</h1>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 py-6">
        {/* Flex container for tabular layout */}
        <div className="flex flex-col">
          {/* Table Header */}
          <div className="flex border-b border-gray-300 bg-gray-100">
            <div className="flex-1 p-4 font-semibold border-r border-gray-300">Property</div>
            {compareList.map(material => (
              <div key={material.id} className="flex-1 p-4 font-semibold text-center border-r border-gray-300">
                {material.name}
              </div>
            ))}
          </div>

          {/* Image Row */}
          <div className="flex border-b border-gray-300">
            <div className="flex-1 p-4 font-semibold border-r border-gray-300">Image</div>
            {compareList.map(material => (
              <div key={material.id} className="flex-1 p-4 text-center border-r border-gray-300">
                <img
                  src={`data:image/jpeg;base64,${material.picture}`}
                  alt={material.name}
                  className="w-24 h-24 object-cover mx-auto"
                />
              </div>
            ))}
          </div>

          {/* Unit Price Row */}
          <div className="flex border-b border-gray-300">
            <div className="flex-1 p-4 font-semibold border-r border-gray-300">Unit Price</div>
            {compareList.map(material => (
              <div key={material.id} className="flex-1 p-4 text-center border-r border-gray-300">
                Rs.{material.unitPrice}
              </div>
            ))}
          </div>

          {/* Actions Row */}
          <div className="flex">
            <div className="flex-1 p-4 font-semibold border-r border-gray-300">Actions</div>
            {compareList.map(material => (
              <div key={material.id} className="flex-1 p-4 text-center border-r border-gray-300">
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center space-x-2"
                  onClick={() => navigate(`/material/${material.id}`)}
                >
                  <FaShoppingCart />
                  <span>Buy Now</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
