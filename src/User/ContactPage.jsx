import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import UserNavbar from './UserNavbar';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission
    // For this example, we will just display a success message
    setFormStatus('Your message has been sent successfully!');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
        <UserNavbar/>
      <header className="bg-red-600 text-white py-4">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Contact Us</h1>
        </div>
      </header>
      
      {/* Contact Form Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg mb-6">
            We’d love to hear from you! Whether you have a question, need assistance, or just want to provide feedback, feel free to reach out to us using the form below.
          </p>
          <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
            >
              Send Message
            </button>
            {formStatus && <p className="mt-4 text-green-600">{formStatus}</p>}
          </form>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="bg-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Our Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaEnvelope className="text-orange-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">
                <a href="mailto:info@constructionmaterials.com" className="text-orange-600 hover:underline">info@constructionmaterials.com</a>
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaPhone className="text-orange-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">
                <a href="tel:+1234567890" className="text-orange-600 hover:underline">+1 (234) 567-890</a>
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaMapMarkerAlt className="text-orange-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600">kamaraj college of engineering and technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Our Location</h2>
          <div className="relative w-full h-80 rounded-lg overflow-hidden">
            {/* <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0232029416386!2d-122.08424948468143!3d37.42199977982542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb0f17a3e1b71%3A0x51e9b0603067f7a8!2sGoogleplex!5e0!3m2!1sen!2sus!4v1617182563685!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe> */}
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.096238883435!2d77.9627853747891!3d9.672817990416524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b012a8e3d378b53%3A0x15d8265b00bea0df!2sKamaraj%20College%20of%20Engineering%20%26%20Technology%20(Autonomous)!5e0!3m2!1sen!2sin!4v1726285448063!5m2!1sen!2sin"
             width="100%" 
             height="100%" 
             style={{border: 0}}
             allowfullscreen="" 
             loading="lazy" >

             </iframe>
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

export default ContactPage;