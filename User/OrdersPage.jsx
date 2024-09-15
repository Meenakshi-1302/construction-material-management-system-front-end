// // OrdersPage.js
// import React from 'react';
// import { useSelector } from 'react-redux';
// import UserNavbar from './UserNavbar';

// const OrdersPage = () => {
//   const { details } = useSelector((state) => state.purchase);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <UserNavbar/>
//       <main className="p-6">
//         <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">Order History</h1>

//           {details.length === 0 ? (
//             <p className="text-center text-gray-500">No orders found.</p>
//           ) : (
//             <ul className="space-y-4">
//               {details.map((order, index) => (
//                 <li key={index} className="border-b py-4">
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-2">Order #{index + 1}</h2>
//                   <p className="text-gray-700">Time of Purchase: {new Date(order.timeOfPurchase).toLocaleString()}</p>
//                   <h3 className="text-xl font-semibold text-gray-800 mt-4">Products Purchased:</h3>
//                   <ul className="space-y-2">
//                     {order.items.map((item) => (
//                       <li key={item.id} className="flex justify-between items-center border-b py-2">
//                         <div className="flex items-center space-x-4">
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             className="w-20 h-20 object-cover rounded-lg"
//                           />
//                           <div>
//                             <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
//                             <p className="text-gray-600">{item.description}</p>
//                             <p className="text-gray-900">Rs.{item.unitPrice.toFixed(2)}</p>
//                             <p className="text-gray-700">Quantity: {item.quantity}</p>
//                           </div>
//                         </div>
//                         <p className="text-gray-900">Rs.{(item.unitprice * item.quantity).toFixed(2)}</p>
//                       </li>
//                     ))}
//                   </ul>
//                   <h3 className="text-xl font-semibold text-gray-800 mt-4">Total Amount:</h3>
//                   <p className="text-gray-900">Rs.{order.totalAmount.toFixed(2)}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default OrdersPage;

// OrdersPage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserNavbar from './UserNavbar';
import { setOrderDetails } from '../actions/actions'; // Adjust import according to your structure

const OrdersPage = () => {
  const { details } = useSelector((state) => state.purchase);
  const dispatch = useDispatch();

  useEffect(() => {
    // Load order details from local storage on component mount
    const savedDetails = JSON.parse(localStorage.getItem('orderDetails'));
    if (savedDetails) {
      dispatch(setOrderDetails(savedDetails)); // Set order details in Redux state
    }
  }, [dispatch]);

  useEffect(() => {
    // Save order details to local storage whenever they change
    if (details.length > 0) {
      localStorage.setItem('orderDetails', JSON.stringify(details));
    }
  }, [details]);

  const handleLogout = () => {
    // Clear local storage on logout
    localStorage.removeItem('orderDetails');
    // Perform logout actions (e.g., clearing user state, redirecting to login page)
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar onLogout={handleLogout} />
      <main className="p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Order History</h1>

          {details.length === 0 ? (
            <p className="text-center text-gray-500">No orders found.</p>
          ) : (
            <ul className="space-y-4">
              {details.map((order, index) => (
                <li key={index} className="border-b py-4">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Order #{index + 1}</h2>
                  <p className="text-gray-700">Time of Purchase: {new Date(order.timeOfPurchase).toLocaleString()}</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-4">Products Purchased:</h3>
                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex justify-between items-center border-b py-2">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div>
                            <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
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
                  <p className="text-gray-900">Rs.{order.totalAmount.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;

