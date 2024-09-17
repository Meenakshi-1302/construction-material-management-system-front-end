// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const generateOrderId = () => {
//   // Generate a unique order ID based on timestamp and a random number
//   return `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
// };

// const PurchaseSummaryPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { state } = location;

//   if (!state || !state.paymentDetails) {
//     return <p>No payment details available.</p>;
//   }

//   const { items, totalAmount, timeOfPurchase } = state.paymentDetails;

//   // Generate a unique order ID
//   const orderId = generateOrderId();

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <main className="p-6">
//         <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You for Your Purchase!</h1>

//           <section className="mb-6">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Purchase Summary</h2>
//             <div className="bg-gray-200 p-4 rounded-lg">
//               <p className="font-medium text-gray-700">Order ID:</p>
//               <p className="text-gray-600">{orderId}</p>

//               <p className="font-medium text-gray-700 mt-4">Time of Purchase:</p>
//               <p className="text-gray-600">{new Date(timeOfPurchase).toLocaleString()}</p>

//               <h3 className="text-xl font-semibold text-gray-800 mt-4">Products Purchased:</h3>
//               <ul className="space-y-4 mt-2">
//                 {items.map((item) => (
//                   <li key={item.id} className="flex justify-between items-center border-b py-4">
//                     <div className="flex items-center space-x-4">
//                       <img
//                         src={item.picture}
//                         alt={item.name}
//                         className="w-20 h-20 object-cover rounded-lg"
//                       />
//                       <div>
//                         <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
//                         <p className="text-gray-600">{item.description}</p>
//                         <p className="text-gray-900">Rs.{item.unitPrice.toFixed(2)}</p>
//                         <p className="text-gray-700">Quantity: {item.quantity}</p>
//                       </div>
//                     </div>
//                     <p className="text-gray-900">Rs.{(item.unitPrice * item.quantity).toFixed(2)}</p>
//                   </li>
//                 ))}
//               </ul>

//               <h3 className="text-xl font-semibold text-gray-800 mt-4">Total Amount:</h3>
//               <p className="text-gray-900">Rs.{totalAmount.toFixed(2)}</p>
//             </div>
//           </section>

//           <section>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thank You!</h2>
//             <p className="text-gray-600">We appreciate your business. Your order will be processed shortly.</p>
//           </section>

//           {/* Return to Home Button */}
//           <div className="mt-6 text-center">
//             <button
//               onClick={() => navigate('/home')}
//               className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//             >
//               Return to Home
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PurchaseSummaryPage;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const generateOrderId = () => {
  // Generate a unique order ID based on timestamp and a random number
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

const PurchaseSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [orderSent, setOrderSent] = useState(false);

  const { state } = location;

  // Extract payment details from state
  const paymentDetails = state?.paymentDetails;

  // Generate a unique order ID
  const orderId = generateOrderId();

  // Function to send order data to the backend
  const sendOrderToBackend = async () => {
    try {
      const response = await axios.post('http://localhost:8086/orders', {
        orderId: orderId,
        totalAmount: paymentDetails.totalAmount,
        timeOfPurchase: paymentDetails.timeOfPurchase,
        items: paymentDetails.items.map(item => ({
          name: item.name,
          description: item.description,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
        
        })),
      });

      if (response.status === 201) {
        console.log('Order successfully sent to backend');
        setOrderSent(true);
      } else {
        console.error('Failed to send order to backend');
        setError('Failed to send order to backend');
      }
    } catch (error) {
      console.error('Error sending order to backend', error);
      setError('Error sending order to backend');
    }
  };

  useEffect(() => {
    // Only send order if paymentDetails are available and not already sent
    if (paymentDetails && !orderSent) {
      sendOrderToBackend();
    }
  }, [paymentDetails, orderSent, orderId]);  // Dependencies

  if (!paymentDetails) {
    return <p>No payment details available.</p>;
  }

  const { items, totalAmount, timeOfPurchase } = paymentDetails;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You for Your Purchase!</h1>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Purchase Summary</h2>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="font-medium text-gray-700">Order ID:</p>
              <p className="text-gray-600">{orderId}</p>

              <p className="font-medium text-gray-700 mt-4">Time of Purchase:</p>
              <p className="text-gray-600">{new Date(timeOfPurchase).toLocaleString()}</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4">Products Purchased:</h3>
              <ul className="space-y-4 mt-2">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between items-center border-b py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.picture}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="text-gray-900">Rs.{item.unitPrice.toFixed(2)}</p>
                        <p className="text-gray-700">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-gray-900">Rs.{(item.unitPrice * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4">Total Amount:</h3>
              <p className="text-gray-900">Rs.{totalAmount.toFixed(2)}</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thank You!</h2>
            <p className="text-gray-600">We appreciate your business. Your order will be processed shortly.</p>
          </section>

          {/* Return to Home Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/home')}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Return to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PurchaseSummaryPage;




