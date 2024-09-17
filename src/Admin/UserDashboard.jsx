// UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8085/users/all');
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center py-4 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Admin Navbar */}
      <AdminNavbar />
      
      {/* Home Icon */}
      <div className="absolute top-16 left-8">
        <a href="/admin-dashboard" className="text-blue-600 hover:text-blue-800">
          <FontAwesomeIcon icon={faHome} size="2x" />
        </a>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-12 p-8">
        {/* User Count Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 border border-gray-200 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">User Count</h2>
          <div className="text-5xl font-extrabold text-blue-600">
            {users.length}
          </div>
        </div>

        {/* User Details Table */}
        <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">User Details</h2>
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Profile Picture</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-300">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.profilePicture ? (
                      <img
                        src={`data:image/jpeg;base64,${user.profilePicture}`} // Adjust MIME type if necessary
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">No picture</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
