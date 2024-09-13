// src/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // For navigation, if using react-router
import Navbar from './User/Navbar';
import { useSpring, animated } from '@react-spring/web';

const LandingPage = () => {
  // Animation settings for the feature cards
  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 200, friction: 20 },
    delay: 200,
  });

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-orange-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Construction Material Management System</h1>
          <p className="text-lg mb-8">
            Streamline your material procurement, inventory, and logistics with our comprehensive management system.
          </p>
          <Link to="/login">
            <button className="bg-orange-800 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <animated.div style={springProps} className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-4">Inventory Management</h3>
              <p>
                Keep track of your materials, manage stock levels, and forecast future needs efficiently.
              </p>
            </animated.div>
            <animated.div style={springProps} className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-4">Order Processing</h3>
              <p>
                Simplify and automate the process of placing and tracking orders with our intuitive system.
              </p>
            </animated.div>
            <animated.div style={springProps} className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-4">Supplier Management</h3>
              <p>
                Manage your suppliers, compare quotes, and ensure timely deliveries to keep your projects on track.
              </p>
            </animated.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About Us</h2>
          <p className="text-lg mb-4">
            Our mission is to provide a robust platform that simplifies construction material management. Our system is designed to handle complex logistics and procurement processes, making it easier for you to manage your construction materials effectively.
          </p>
          <p className="text-lg">
            We pride ourselves on our user-friendly interface and comprehensive features that cater to all your construction material needs. Whether you're managing a small project or a large construction site, our system has you covered.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <p className="text-lg mb-4">“This system has transformed the way we handle our materials. It's intuitive, efficient, and has saved us countless hours.”</p>
              <p className="font-semibold">- Alex Johnson, Project Manager</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <p className="text-lg mb-4">“A game-changer for our procurement process. The supplier management feature is particularly useful.”</p>
              <p className="font-semibold">- Jamie Lee, Construction Supervisor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <p className="text-lg mb-4">
            Have questions or need support? Feel free to reach out to us.
          </p>
          <Link to="/contact">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
              Contact Support
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Construction Material Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
