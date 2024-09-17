import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar'; // Adjust the import path if necessary

const ORDERS_URL = 'http://localhost:8086/order';
const STATUS_OPTIONS = ['Shipped', 'Delivered'];

const OrderTrackingPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(ORDERS_URL);
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:8086/order/${orderId}`, { status: newStatus });
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      setError('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="pt-16"> {/* Ensure there's enough top padding for the AdminNavbar */}
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Order Tracking</h1>
          {/* Orders List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-white shadow-md rounded-lg p-4"
              >
                <h3 className="text-lg font-semibold mb-2">Order ID: {order.customerorder.orderId}</h3>
                {/* <p className="text-gray-600 mb-2">Items: {order.customerorder.items}</p> */}
                <p className="text-gray-600 mb-2">Quantity: {order.quantity}</p>
                <p className="text-gray-600 mb-2">Total Price: Rs.{order.customerorder.totalAmount}</p>
                <p className="text-gray-600 mb-2">Order Date: {new Date(order.customerorder.timeOfPurchase).toLocaleDateString()}</p>
                <div className="mb-2">
                  <label htmlFor={`status-${order.id}`} className="block text-gray-700 mb-1">Status:</label>
                  <select
                    id={`status-${order.id}`}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="block w-full border-gray-300 rounded-md shadow-sm"
                  >
                    {STATUS_OPTIONS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
