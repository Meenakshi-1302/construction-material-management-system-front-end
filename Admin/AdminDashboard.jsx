import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import { FaUser, FaMoneyBill, FaBox } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Sample data for the charts
const barChartData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Revenue',
      data: [4000, 3500, 5000, 4500, 6000],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }
  ]
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'User Growth',
        data: [],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1
      }
    ]
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8085/users/all');
        const users = response.data;

        // Transform data for chart
        const groupedData = users.reduce((acc, user) => {
          const month = new Date(user.registrationDate).toLocaleString('default', { month: 'short' });
          if (!acc[month]) {
            acc[month] = 0;
          }
          acc[month]++;
          return acc;
        }, {});

        const labels = Object.keys(groupedData);
        const data = Object.values(groupedData);

        setLineChartData({
          labels,
          datasets: [
            {
              label: 'User Growth',
              data,
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1
            }
          ]
        });

        setUserCount(users.length);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    const fetchSupplierCount = async () => {
      try {
        const response = await axios.get('http://localhost:8085/suppliers/all');
        setSupplierCount(response.data.length);
      } catch (error) {
        console.error('Failed to fetch supplier count:', error);
      }
    };

    const fetchInventoryCount = async () => {
      try {
        const response = await axios.get('http://localhost:8085/inventory/all');
        setInventoryCount(response.data.length);
      } catch (error) {
        console.error('Failed to fetch inventory count:', error);
      }
    };

    fetchUserData();
    fetchSupplierCount();
    fetchInventoryCount();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />

      <div className="flex flex-1 pt-16 transition-transform duration-300 ease-in-out">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 ml-64 transition-opacity duration-500 ease-in-out">
          {/* Charts */}
          <div className="w-full max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:scale-105 ease-in-out duration-300">
                <h3 className="text-xl font-semibold mb-4">User Growth</h3>
                <Line data={lineChartData} />
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:scale-105 ease-in-out duration-300">
                <h3 className="text-xl font-semibold mb-4">Monthly Revenue</h3>
                <Bar data={barChartData} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Stats Cards */}
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transform transition-transform hover:scale-105 ease-in-out duration-300">
                <h3 className="text-xl font-semibold mb-4">User Count</h3>
                <p className="text-2xl font-bold">{userCount}</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transform transition-transform hover:scale-105 ease-in-out duration-300">
                <h3 className="text-xl font-semibold mb-4">Inventory Count</h3>
                <p className="text-2xl font-bold">{inventoryCount}</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transform transition-transform hover:scale-105 ease-in-out duration-300">
                <h3 className="text-xl font-semibold mb-4">Supplier Count</h3>
                <p className="text-2xl font-bold">{supplierCount}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Action Cards */}
              <Link to="/inventory" className="bg-blue-600 text-white shadow-lg rounded-lg p-6 flex items-center justify-between hover:bg-blue-700 transition-colors ease-in-out duration-300">
                <div className="flex items-center">
                  <FaBox className="text-3xl mr-4" />
                  <h3 className="text-xl font-semibold">Manage Inventory</h3>
                </div>
                <span className="text-xl">&rarr;</span>
              </Link>
              <Link to="/revenue" className="bg-green-600 text-white shadow-lg rounded-lg p-6 flex items-center justify-between hover:bg-green-700 transition-colors ease-in-out duration-300">
                <div className="flex items-center">
                  <FaMoneyBill className="text-3xl mr-4" />
                  <h3 className="text-xl font-semibold">Revenue</h3>
                </div>
                <span className="text-xl">&rarr;</span>
              </Link>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-auto transition-opacity duration-500 ease-in-out">
        <div className="text-center">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
          <p>
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link> | 
            <Link to="/terms-of-service" className="hover:underline"> Terms of Service</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
