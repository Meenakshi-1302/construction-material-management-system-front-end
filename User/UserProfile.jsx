import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from './UserNavbar'; // Adjust the path if necessary

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8085/users/'+sessionStorage.getItem("userid"));
        setUser(response.data);
        console.log(user)
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar />
      <div className="p-6 pt-20">
        <div className="flex justify-center items-center mb-6">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
            {user ? (
              <>
                <div className="text-center mb-4">
                  {/* Conditional rendering for profile picture */}
                  {user.profilePicture ? (
                    <img
                    src={`data:image/jpeg;base64,${user.profilePicture}`}
                    alt={user.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mx-auto">
                      <span className="text-gray-600">No Image</span>
                    </div>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-center mb-2">{user.name}</h1>
                <p className="text-center text-gray-700 mb-2">Email: {user.email}</p>
                <p className="text-center text-gray-700 mb-2">Username: {user.username}</p>
                {/* Add more user details here if necessary */}
              </>
            ) : (
              <p className="text-center">No user details available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
