import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import AdminNavbar from './AdminNavbar';
import AddSupplierModal from './AddSupplierModal'; // Import the modal component
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const InventoryPage = () => {
  const [inventoryDetails, setInventoryDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items per page
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/inventory/all?page=${currentPage}&size=${itemsPerPage}`);
        const data = response.data;

        setInventoryDetails(data);
        setTotalPages(data.totalPages || 1); // Adjust based on your API response

        // Update notifications based on the fetched data
        const newNotifications = data.filter(item => item.material && item.material.quantity === item.reorderLevel)
                                     .map(item => `Time to restock: ${item.material.materialName}`);
        setNotifications(newNotifications);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchInventoryData();
  }, [currentPage, itemsPerPage]);

  // Prepare data for charts
  const prepareChartData = () => {
    const materialCounts = inventoryDetails.reduce((acc, item) => {
      const materialName = item.material ? item.material.materialName : 'Unknown';
      acc[materialName] = (acc[materialName] || 0) + (item.material ? item.material.quantity : 0);
      return acc;
    }, {});

    const labels = Object.keys(materialCounts);
    const data = Object.values(materialCounts);

    return {
      labels,
      datasets: [
        {
          label: 'Material Quantity',
          data,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = prepareChartData();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddInventory = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleBackToDashboard = () => {
    navigate('/admin-dashboard'); // Navigate to Admin Dashboard
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="p-6 pt-20">
        {/* Back Button and Title */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackToDashboard}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
          >
            Back to Admin Dashboard
          </button>
          <h1 className="text-2xl font-bold">Inventory Overview</h1>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="bg-yellow-200 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
            <ul>
              {notifications.map((notification, index) => (
                <li key={index} className="text-yellow-800">{notification}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Charts */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Pie Chart */}
          <div className="flex-1 bg-white p-4 shadow-md rounded-lg max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4">Material Distribution (Pie Chart)</h2>
            <div style={{ width: '300px', height: '300px' }}>
              <Pie data={chartData} />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex-1 bg-white p-4 shadow-md rounded-lg max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4">Material Quantity (Bar Chart)</h2>
            <div style={{ width: '300px', height: '300px' }}>
              <Bar data={chartData} />
            </div>
          </div>
        </div>

        {/* Inventory Details Table */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Inventory Details</h2>
            <button
              onClick={handleAddInventory}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Add Inventory
            </button>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Material Name</th>
                <th className="px-4 py-2 text-left">ReOrder Level</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Batch Number</th>
                <th className="px-4 py-2 text-left">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {inventoryDetails.length > 0 ? (
                inventoryDetails.map((detail) => (
                  <tr key={detail.inventoryId} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{detail.material ? detail.material.materialName : 'N/A'}</td>
                    <td className="px-4 py-2">{detail.reorderLevel}</td>
                    <td className="px-4 py-2">{detail.status}</td>
                    <td className="px-4 py-2">{detail.batchNumberOrSerialNumber}</td>
                    <td className="px-4 py-2">{detail.material ? detail.material.quantity : 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-2 text-center">No inventory details available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal Component */}
      <AddSupplierModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default InventoryPage;
