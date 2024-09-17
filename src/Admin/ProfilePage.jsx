import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log('Fetching user details...');
        const response = await axios.get('http://localhost:8085/admin-users/all');
        console.log('Response data:', response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleBackToDashboard = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="p-6 pt-20">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackToDashboard}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
          >
            Back to Admin Dashboard
          </button>
          <h1 className="text-2xl font-bold">Profile Overview</h1>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userDetails.length > 0 ? (
              userDetails.map((user) => (
                <div key={user.id} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                  <img
                    src="\adinprofile.png"
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-2">{user.userName}</h2>
                  <p className="text-gray-700 mb-2">Email: {user.email}</p>
                 
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No user details available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
