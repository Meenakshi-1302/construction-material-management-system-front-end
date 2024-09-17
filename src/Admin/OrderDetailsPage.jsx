import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const OrderDetailsPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8086/orders');
        setOrders(response.data); // Assuming response.data is an array of orders
      } catch (err) {
        setError('Failed to fetch orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:8086/orders/${orderId}`, { status: newStatus });
      // Update the status locally after successful update
      setOrders(orders.map(order =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      setError('Failed to update order status');
      console.error(err);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <AdminNavbar />
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Container for button and title */}
        <div className="flex items-center mb-6 space-x-4">
          <button
            onClick={() => navigate('/admin-dashboard')}
            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            &larr; Back to Dashboard
          </button>
          {/* Spacer */}
          <div className="flex-1" />
          <h1 className="text-4xl font-bold text-gray-800">Order Details</h1>
        </div>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time of Purchase</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={`${order.orderId}-${order.timeOfPurchase}`}>
                    
                    <td className="px-6 py-4 whitespace-nowrap">{order.orderId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">Rs.{order.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{new Date(order.timeOfPurchase).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ul className="space-y-2">
                        {order.items.map(item => (
                          <li key={`${item.id}-${item.name}`} className="flex items-center space-x-4 border p-4 rounded-lg shadow-sm">
                            <img src={item.picture} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                            <div className="flex-1">
                              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                              <p className="text-gray-600">{item.description}</p>
                              <p className="text-gray-900 font-semibold">Rs.{item.unitPrice.toFixed(2)}</p>
                              <p className="text-gray-700">Quantity: {item.quantity}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                        className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="" >Change Status</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
