import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SupplierNavbar from './SupplierNavbar';
 // Adjust the path if necessary

const SupplierHome = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8085/request/all');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError('Failed to fetch requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
     <SupplierNavbar/>
      <div className="p-6 pt-20">
        <div className="flex flex-wrap justify-center gap-6">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div key={request.id} className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                <h2 className="text-xl font-semibold mb-2">Request #{request.requestId}</h2>
                <p className="text-gray-700 mb-2">UnitInOrder: {request.unitInOrder}</p>
                <p className="text-gray-700 mb-2">TotalAmount: Rs.{request.totalAmount.toFixed(2)}</p>
                <p className="text-gray-700 mb-2">Address: {request.address}</p>
                
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No requests available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierHome;
