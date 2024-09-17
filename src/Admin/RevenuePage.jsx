// RevenuePage.jsx
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale
);

const RevenuePage = () => {
  const navigate = useNavigate();

  const monthlyRevenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [3000, 4000, 3500, 5000, 4500, 6000, 7000, 6500, 7000, 8000, 8500, 9000],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
      },
    ],
  };

  const yearlyRevenueData = {
    labels: ['2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Yearly Revenue',
        data: [35000, 42000, 47000, 55000],
        backgroundColor: '#3b82f6',
        borderColor: '#1d4ed8',
        borderWidth: 1,
      },
    ],
  };

  const handleBackButtonClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="pt-16 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <button 
          onClick={handleBackButtonClick} 
          className="mb-6 bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Revenue Charts</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
          <Line 
            data={monthlyRevenueData} 
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Monthly Revenue Over the Year',
                },
                legend: {
                  display: true,
                  position: 'top',
                },
              },
            }} 
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Yearly Revenue</h2>
          <Bar 
            data={yearlyRevenueData} 
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Yearly Revenue Comparison',
                },
                legend: {
                  display: true,
                  position: 'top',
                },
              },
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;
