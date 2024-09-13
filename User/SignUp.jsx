import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    profilePicture: null,
  });
  const [errors, setErrors] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    profilePicture: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const validateUsername = (username) => username.trim().includes(' ') ? 'Username should not contain spaces.' : '';
  const validateName = (name) => name.trim() === '' ? 'Name is required.' : '';
  const validateEmail = (email) => !email.includes('@') ? 'Email must contain an @ symbol.' : '';
  const validatePassword = (password) => /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password) ? '' : 'Password must be at least 8 characters long, contain one capital letter and one special character.';
  const validateConfirmPassword = (confirmPassword, password) => confirmPassword !== password ? 'Passwords do not match.' : '';
  const validatePhoneNumber = (phoneNumber) => /^[0-9]{10}$/.test(phoneNumber) ? '' : 'Phone number must be exactly 10 digits.';
  const validateAddress = (address) => address.trim() === '' ? 'Address is required.' : '';

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: (() => {
        switch (id) {
          case 'username':
            return validateUsername(value);
          case 'name':
            return validateName(value);
          case 'email':
            return validateEmail(value);
          case 'password':
            return validatePassword(value);
          case 'confirmPassword':
            return validateConfirmPassword(value, formData.password);
          case 'phoneNumber':
            return validatePhoneNumber(value);
          case 'address':
            return validateAddress(value);
          default:
            return '';
        }
      })(),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, profilePicture: file }));

    setErrors((prevErrors) => ({ ...prevErrors, profilePicture: '' }));
  };

  useEffect(() => {
    const isValid = Object.values(formData).every(value => value !== '' || value === null) &&
      Object.values(errors).every(error => error === '') &&
      formData.password === formData.confirmPassword;
    setIsFormValid(isValid);
  }, [formData, errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const formDataToSend = new FormData();
      console.log(formData);
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) formDataToSend.append(key, formData[key]);
      });

      try {
        const response = await axios.post('http://localhost:8085/users', formDataToSend);

        if (response.status === 200) {
          toast.success('Registration successful!', {
            onClose: () => navigate('/login'), // Redirect after toast is closed
          });
        } else {
          toast.error('Registration failed');
        }
      } catch (error) {
        toast.error('Error occurred during registration');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <Header />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2">Username</label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>

          {/* Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-2">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Phone Number Field */}
          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
            <input
              id="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* Address Field */}
          <div className="mb-6">
            <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-2">Address</label>
            <textarea
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows="3"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          {/* Profile Picture Field */}
          <div className="mb-6">
            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-600 mb-2">Profile Picture</label>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.profilePicture ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
            />
            {formData.profilePicture && (
              <img
                src={URL.createObjectURL(formData.profilePicture)}
                alt="Profile Preview"
                className="mt-4 w-32 h-32 object-cover rounded-full mx-auto"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition duration-300 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Sign Up
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
          </p>
        </form>
      </div>
      <ToastContainer /> {/* Add ToastContainer component */}
    </div>
  );
};

export default SignUp;
