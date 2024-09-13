// src/HomePage.jsx
import React from 'react';
import Slider from 'react-slick';
import { FaShoppingCart, FaRegCreditCard } from 'react-icons/fa';
import UserNavbar from './UserNavbar';

// Sample data for materials
const materials = [
  { id: 1, name: 'Brick', price: '$5.00', image: 'https://via.placeholder.com/200x150' },
  { id: 2, name: 'Cement', price: '$10.00', image: 'https://via.placeholder.com/200x150' },
  { id: 3, name: 'Steel', price: '$20.00', image: 'https://via.placeholder.com/200x150' },
  { id: 4, name: 'Wood', price: '$15.00', image: 'https://via.placeholder.com/200x150' },
];

// Carousel settings
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

// HomePage Component
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">

        <UserNavbar/>
      {/* Carousel */}
      <div className="w-full h-64 mb-8">
        <Slider {...carouselSettings}>
          <div className="bg-blue-500 h-full flex items-center justify-center text-white text-3xl font-bold">
            Slide 1
          </div>
          <div className="bg-red-500 h-full flex items-center justify-center text-white text-3xl font-bold">
            Slide 2
          </div>
          <div className="bg-green-500 h-full flex items-center justify-center text-white text-3xl font-bold">
            Slide 3
          </div>
        </Slider>
      </div>

      {/* Materials Cards */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div key={material.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={material.image} alt={material.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{material.name}</h3>
                <p className="text-xl font-bold text-blue-600 mb-4">{material.price}</p>
                <div className="flex space-x-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2">
                    <FaRegCreditCard />
                    <span>Buy Now</span>
                  </button>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center space-x-2">
                    <FaShoppingCart />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4 mt-8">
        <div className="text-center">
          <p>&copy; 2024 Construction Materials Management System. All rights reserved.</p>
          <p>
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> | 
            <a href="/terms-of-service" className="hover:underline"> Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
