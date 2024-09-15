import React from 'react';
import { FaBuilding, FaUsers, FaHandshake } from 'react-icons/fa';
import UserNavbar from './UserNavbar';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
        <UserNavbar/>
      <header className="bg-red-600 text-white py-4">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold">About Us</h1>
        </div>
      </header>
      
      {/* Company Overview Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Company Overview</h2>
          <p className="text-lg mb-6">
            Welcome to Construction Materials Management System. We are dedicated to providing high-quality construction materials to help build the future. Our mission is to deliver excellence through our innovative solutions, ensuring that every project is built with the best materials available.
          </p>
          <p className="text-lg">
            With years of experience in the industry, we understand the complexities and demands of construction projects. Our team of experts is here to guide you in selecting the right materials, ensuring that your project meets both safety and quality standards.
          </p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaBuilding className="text-orange-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">
                We prioritize quality in every product we offer. Our materials undergo rigorous testing to ensure they meet the highest standards of durability and reliability.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaUsers className="text-orange-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We are committed to providing exceptional service and support to ensure your complete satisfaction.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaHandshake className="text-orange-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We operate with the highest level of integrity. Our commitment to honesty and transparency is reflected in all our interactions and business practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg mb-6">
            We’d love to hear from you! Whether you have a question, need assistance, or want to learn more about our products, feel free to contact us.
          </p>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
            <p className="text-gray-600">Email: <a href="mailto:info@constructionmaterials.com" className="text-orange-600 hover:underline">info@constructionmaterials.com</a></p>
            <p className="text-gray-600">Phone: <a href="tel:+1234567890" className="text-orange-600 hover:underline">+1 (234) 567-890</a></p>
            <p className="text-gray-600">Address: 123 Construction St, Building City, CA 12345</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-600 text-white py-4 mt-8">
        <div className="text-center">
          <p>&copy; 2024 Construction Materials Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
