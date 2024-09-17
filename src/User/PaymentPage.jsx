// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { FaCreditCard, FaPaypal } from 'react-icons/fa';
// import { useForm } from 'react-hook-form';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import { savePaymentDetails } from '../paymentSlice'; // Adjust the import path as needed
// import { addPurchaseDetails } from '../purchaseSlice';
// import { clearCart } from '../cartSlice'; // Import clearCart action
// import UserNavbar from './UserNavbar';

// // Helper function to detect card type
// const detectCardType = (cardNumber) => {
//   if (/^4/.test(cardNumber)) {
//     return 'Visa';
//   } else if (/^5[1-5]/.test(cardNumber)) {
//     return 'MasterCard';
//   } else if (/^6/.test(cardNumber)) {
//     return 'Discover';
//   } else if (/^2(0[2-9]|[1-9][0-9])/.test(cardNumber)) {
//     return 'Rupay';
//   } else {
//     return 'Unknown';
//   }
// };

// const PaymentPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState(null);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
//   const [cardType, setCardType] = useState(''); // State for card type
//   const { items, cartTotal } = useSelector((state) => state.cart);
//   const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

//   useEffect(() => {
//     axios.get('http://localhost:8085/users/' + sessionStorage.getItem("userid"))
//       .then(response => {
//         setUserDetails(response.data);
//         setValue('username', response.data.username);
//         setValue('email', response.data.email);
//         setValue('address', response.data.address);
//       })
//       .catch(error => console.error('Error fetching user details:', error));
//   }, [setValue]);

//   // Watch card number input to detect card type
//   const cardNumber = watch('cardNumber', '');

//   useEffect(() => {
//     setCardType(detectCardType(cardNumber));
//   }, [cardNumber]);

//   const handlePaymentMethodChange = (method) => {
//     setSelectedPaymentMethod(method);
//   };

//   const onSubmit = async (data) => {
//     if (!data.address) {
//       Swal.fire('Error', 'Address field should not be empty', 'error');
//       return;
//     }

//     // Validate payment method details here...
//     if (selectedPaymentMethod === 'CreditCard') {
//       if (!data.cardNumber || data.cardNumber.length !== 16 || isNaN(data.cardNumber)) {
//         Swal.fire('Error', 'Card number must be 16 digits long and numeric', 'error');
//         return;
//       }
//       if (!data.expiryMonth || data.expiryMonth < 1 || data.expiryMonth > 12) {
//         Swal.fire('Error', 'Expiry month must be between 1 and 12', 'error');
//         return;
//       }
//       if (!data.expiryYear || data.expiryYear <= new Date().getFullYear()) {
//         Swal.fire('Error', 'Expiry year must be greater than the current year', 'error');
//         return;
//       }
//       if (!data.cvv || data.cvv.length !== 3 || isNaN(data.cvv)) {
//         Swal.fire('Error', 'CVV must be 3 digits long and numeric', 'error');
//         return;
//       }
//     } else if (selectedPaymentMethod === 'PayPal') {
//       // if (!data.upıId || !data.upıId.includes('@')) {
//       //   Swal.fire('Error', 'UPI ID must contain "@" symbol', 'error');
//       //   return;
//       // }
//       if (!data.password || data.password.length !== 6 || isNaN(data.password)) {
//         Swal.fire('Error', 'Password must be exactly 6 digits long and numeric', 'error');
//         return;
//       }
//     }

//     // Calculate totalAmount safely
//     const totalAmount = typeof cartTotal === 'number' ? cartTotal : 0;

//     Swal.fire('Success', 'Payment completed successfully', 'success').then(() => {
//       const paymentDetails = {
//         items,
//         totalAmount,
//         timeOfPurchase: new Date().toISOString(),
//       };

//       dispatch(addPurchaseDetails({
//         method: selectedPaymentMethod,
//         ...data,
//         items, // Include cart items
//         totalAmount, // Total amount of the purchase
//         timeOfPurchase: new Date().toISOString(), // Timestamp of purchase
//       }));

//       // Clear the cart
//       dispatch(clearCart());

//       // Redirect to purchase summary page
//       navigate('/purchase-summary', { state: { paymentDetails } });
//     });
//   };

//   if (!userDetails) {
//     return <p>Loading...</p>;
//   }

//   // Ensure cartTotal is a number before calling toFixed
//   const formattedCartTotal = (typeof cartTotal === 'number' ? cartTotal : 0).toFixed(2);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <UserNavbar/>
//       <main className="p-6">
//         <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment</h1>

//           {/* User Details Section */}
//           <section className="mb-6">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Details</h2>
//             <div className="bg-gray-200 p-4 rounded-lg">
//               <div className="flex justify-between mb-2">
//                 <label className="font-medium text-gray-700">Username:</label>
//                 <input
//                   type="text"
//                   value={userDetails.username}
//                   readOnly
//                   className="bg-gray-100 text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
//                 />
//               </div>
//               <div className="flex justify-between mb-2">
//                 <label className="font-medium text-gray-700">Email:</label>
//                 <input
//                   type="email"
//                   value={userDetails.email}
//                   readOnly
//                   className="bg-gray-100 text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
//                 />
//               </div>
//               <div className="flex justify-between mb-2">
//                 <label className="font-medium text-gray-700">Address:</label>
//                 <input
//                   type="text"
//                   {...register('address', { required: true })}
//                   placeholder="Enter your address"
//                   className="bg-white text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
//                 />
//                 {errors.address && <p className="text-red-500 text-sm">Address field should not be empty</p>}
//               </div>
//             </div>
//           </section>

//           {/* Cart Items Section */}
//           <section className="mb-6">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cart Summary</h2>
//             {items.length === 0 ? (
//               <p className="text-center text-gray-500">Your cart is empty.</p>
//             ) : (
//               <ul className="space-y-4">
//                 {items.map(item => (
//                   <li key={item.id} className="flex justify-between items-center border-b py-4">
//                     <div className="flex items-center space-x-4">
//                       <img
//                         src={`data:image/jpeg;base64,${item.picture}`}
//                         alt={item.materialName}
//                         className="w-16 h-16 object-cover rounded"
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
//             )}
//             <div className="mt-4 text-right">
//               <h2 className="text-2xl font-semibold text-gray-800">Total: Rs.{formattedCartTotal}</h2>
//             </div>
//           </section>

//           {/* Payment Methods Section */}
//           <section>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Methods</h2>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-4">
//                   <input
//                     type="radio"
//                     id="creditCard"
//                     name="paymentMethod"
//                     value="CreditCard"
//                     checked={selectedPaymentMethod === 'CreditCard'}
//                     onChange={() => handlePaymentMethodChange('CreditCard')}
//                     className="form-radio"
//                   />
//                   <label htmlFor="creditCard" className="flex items-center cursor-pointer">
//                     <FaCreditCard className="text-xl mr-2" />
//                     Credit/Debit Card
//                   </label>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <input
//                     type="radio"
//                     id="paypal"
//                     name="paymentMethod"
//                     value="PayPal"
//                     checked={selectedPaymentMethod === 'PayPal'}
//                     onChange={() => handlePaymentMethodChange('PayPal')}
//                     className="form-radio"
//                   />
//                   <label htmlFor="paypal" className="flex items-center cursor-pointer">
//                     <FaPaypal className="text-xl mr-2" />
//                     PayPal
//                   </label>
//                 </div>
//               </div>

//               {selectedPaymentMethod === 'CreditCard' && (
//                 <div className="space-y-4 mt-4">
//                   <div>
//                     <label htmlFor="cardNumber" className="block text-gray-700">Card Number:</label>
//                     <input
//                       type="text"
//                       id="cardNumber"
//                       {...register('cardNumber', { required: true })}
//                       placeholder="Enter your card number"
//                       className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//                     />
//                     {cardType && <p className="text-gray-600 mt-2">Card Type: {cardType}</p>}
//                     {errors.cardNumber && <p className="text-red-500 text-sm">Card number is required</p>}
//                   </div>
//                   <div>
//                     <label htmlFor="expiryMonth" className="block text-gray-700">Expiry Month:</label>
//                     <input
//                       type="number"
//                       id="expiryMonth"
//                       {...register('expiryMonth', { required: true })}
//                       placeholder="MM"
//                       className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//                     />
//                     {errors.expiryMonth && <p className="text-red-500 text-sm">Expiry month is required</p>}
//                   </div>
//                   <div>
//                     <label htmlFor="expiryYear" className="block text-gray-700">Expiry Year:</label>
//                     <input
//                       type="number"
//                       id="expiryYear"
//                       {...register('expiryYear', { required: true })}
//                       placeholder="YYYY"
//                       className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//                     />
//                     {errors.expiryYear && <p className="text-red-500 text-sm">Expiry year is required</p>}
//                   </div>
//                   <div>
//                     <label htmlFor="cvv" className="block text-gray-700">CVV:</label>
//                     <input
//                       type="password"
//                       id="cvv"
//                       {...register('cvv', { required: true })}
//                       placeholder="CVV"
//                       className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//                     />
//                     {errors.cvv && <p className="text-red-500 text-sm">CVV is required</p>}
//                   </div>
//                 </div>
//               )}

//               {selectedPaymentMethod === 'PayPal' && (
//                 <div className="space-y-4 mt-4">
//                   <div>
//                     <label htmlFor="upiId" className="block text-gray-700">UPI ID:</label>
//                     <input
//                       type="text"
//                       id="upiId"
//                       {...register('upiId', { required: true })}
//                       placeholder="Enter your UPI ID"
//                       className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//                     />
//                     {errors.upıId && <p className="text-red-500 text-sm">UPI ID is required</p>}
//                   </div>
//                   <div>
//                     <label htmlFor="password" className="block text-gray-700">Password:</label>
//                     <input
//                       type="password"
//                       id="password"
//                       {...register('password', { required: true })}
//                       placeholder="Enter your password"
//                       className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//                     />
//                     {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
//                   </div>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={!selectedPaymentMethod}
//                 className={`bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 ${!selectedPaymentMethod ? 'opacity-50 cursor-not-allowed' : ''}`}
//               >
//                 Pay Now
//               </button>
//             </form>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PaymentPage;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { savePaymentDetails } from '../paymentSlice'; // Adjust the import path as needed
import { addPurchaseDetails } from '../purchaseSlice';
import { clearCart } from '../cartSlice'; // Import clearCart action
import UserNavbar from './UserNavbar';

// Helper function to detect card type
const detectCardType = (cardNumber) => {
  if (/^4/.test(cardNumber)) {
    return 'Visa';
  } else if (/^5[1-5]/.test(cardNumber)) {
    return 'MasterCard';
  } else if (/^6/.test(cardNumber)) {
    return 'Discover';
  } else if (/^2(0[2-9]|[1-9][0-9])/.test(cardNumber)) {
    return 'Rupay';
  } else {
    return 'Unknown';
  }
};

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [cardType, setCardType] = useState(''); // State for card type
  const [existingQuantities, setExistingQuantities] = useState({}); // State for existing quantities
  const { items, cartTotal } = useSelector((state) => state.cart);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

  useEffect(() => {
    // Fetch user details
    axios.get('http://localhost:8085/users/' + sessionStorage.getItem("userid"))
      .then(response => {
        setUserDetails(response.data);
        setValue('username', response.data.username);
        setValue('email', response.data.email);
        setValue('address', response.data.address);
      })
      .catch(error => console.error('Error fetching user details:', error));

    // Fetch existing quantities for each material
    const fetchQuantities = async () => {
      const quantities = {};
      for (const item of items) {
        try {
          const response = await axios.get(`http://localhost:8085/materials/${item.id}`);
          quantities[item.id] = response.data.quantity; // Assuming the response contains a `quantity` field
        } catch (error) {
          console.error(`Error fetching quantity for material ${item.id}:`, error);
        }
      }
      setExistingQuantities(quantities);
    };

    fetchQuantities();
  }, [items, setValue]);

  // Watch card number input to detect card type
  const cardNumber = watch('cardNumber', '');

  useEffect(() => {
    setCardType(detectCardType(cardNumber));
  }, [cardNumber]);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const onSubmit = async (data) => {
    if (!data.address) {
      Swal.fire('Error', 'Address field should not be empty', 'error');
      return;
    }

    // Validate payment method details here...
    if (selectedPaymentMethod === 'CreditCard') {
      if (!data.cardNumber || data.cardNumber.length !== 16 || isNaN(data.cardNumber)) {
        Swal.fire('Error', 'Card number must be 16 digits long and numeric', 'error');
        return;
      }
      if (!data.expiryMonth || data.expiryMonth < 1 || data.expiryMonth > 12) {
        Swal.fire('Error', 'Expiry month must be between 1 and 12', 'error');
        return;
      }
      if (!data.expiryYear || data.expiryYear <= new Date().getFullYear()) {
        Swal.fire('Error', 'Expiry year must be greater than the current year', 'error');
        return;
      }
      if (!data.cvv || data.cvv.length !== 3 || isNaN(data.cvv)) {
        Swal.fire('Error', 'CVV must be 3 digits long and numeric', 'error');
        return;
      }
    } else if (selectedPaymentMethod === 'PayPal') {
      if (!data.password || data.password.length !== 6 || isNaN(data.password)) {
        Swal.fire('Error', 'Password must be exactly 6 digits long and numeric', 'error');
        return;
      }
    }

    // Calculate totalAmount safely
    const totalAmount = typeof cartTotal === 'number' ? cartTotal : 0;

    Swal.fire('Success', 'Payment completed successfully', 'success').then(async () => {
      const paymentDetails = {
        items,
        totalAmount,
        timeOfPurchase: new Date().toISOString(),
      };

      // Save payment details in session storage
      sessionStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
      console.log(paymentDetails);
      dispatch(addPurchaseDetails({
        method: selectedPaymentMethod,
        ...data,
        items, // Include cart items
        totalAmount, // Total amount of the purchase
        timeOfPurchase: new Date().toISOString(), // Timestamp of purchase
      }));

      // Clear the cart
      dispatch(clearCart());

      // Update material quantities
      for (const item of items) {
        const existingQuantity = existingQuantities[item.id] || 0;
        const updatedQuantity = existingQuantity - item.quantity;

        if (updatedQuantity < 0) {
          console.error(`Error: Quantity for material ${item.id} cannot be negative.`);
          continue;
        }

        const formData = new FormData();
        formData.append('materialId', item.id);
        formData.append('quantity', updatedQuantity);

        try {
          await axios.put('http://localhost:8085/materials/edit', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set Content-Type header for FormData
            },
          });
        } catch (error) {
          console.error('Error updating material quantity:', error);
        }
      }

      // Redirect to purchase summary page
      navigate('/purchase-summary', { state: { paymentDetails } });
    });
  };

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  // Ensure cartTotal is a number before calling toFixed
  const formattedCartTotal = (typeof cartTotal === 'number' ? cartTotal : 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar />
      <main className="p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment</h1>

          {/* User Details Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Details</h2>
            <div className="bg-gray-200 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <label className="font-medium text-gray-700">Username:</label>
                <input
                  type="text"
                  value={userDetails.username}
                  readOnly
                  className="bg-gray-100 text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex justify-between mb-2">
                <label className="font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  value={userDetails.email}
                  readOnly
                  className="bg-gray-100 text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex justify-between mb-2">
                <label className="font-medium text-gray-700">Address:</label>
                <input
                  type="text"
                  {...register('address', { required: true })}
                  placeholder="Enter your address"
                  className="bg-white text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.address && <p className="text-red-500 text-sm">Address field should not be empty</p>}
              </div>
            </div>
          </section>

          {/* Cart Items Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cart Summary</h2>
            {items.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.id} className="flex justify-between items-center border-b py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={`data:image/jpeg;base64,${item.picture}`}
                        alt={item.materialName}
                        className="w-16 h-16 object-cover rounded"
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
            )}
            <div className="mt-4 text-right">
              <h2 className="text-2xl font-semibold text-gray-800">Total: Rs.{formattedCartTotal}</h2>
            </div>
          </section>

          {/* Payment Method Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Payment Method</h2>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handlePaymentMethodChange('CreditCard')}
                className={`p-4 border rounded-lg flex items-center space-x-2 ${selectedPaymentMethod === 'CreditCard' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
              >
                <FaCreditCard className="text-2xl" />
                <span>Credit Card</span>
              </button>
              <button
                type="button"
                onClick={() => handlePaymentMethodChange('PayPal')}
                className={`p-4 border rounded-lg flex items-center space-x-2 ${selectedPaymentMethod === 'PayPal' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
              >
                <FaPaypal className="text-2xl" />
                <span>PayPal</span>
              </button>
            </div>
          </section>

          {/* Payment Details Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Details</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {selectedPaymentMethod === 'CreditCard' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Card Number</label>
                    <input
                      type="text"
                      {...register('cardNumber', { required: true })}
                      placeholder="Enter your card number"
                      className="bg-white text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm">Card number is required</p>}
                  </div>
                  <div className="flex space-x-4">
                    <div>
                      <label className="block text-gray-700">Expiry Month</label>
                      <input
                        type="number"
                        {...register('expiryMonth', { required: true })}
                        placeholder="MM"
                        className="bg-white text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
                      />
                      {errors.expiryMonth && <p className="text-red-500 text-sm">Expiry month is required</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700">Expiry Year</label>
                      <input
                        type="number"
                        {...register('expiryYear', { required: true })}
                        placeholder="YYYY"
                        className="bg-white text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
                      />
                      {errors.expiryYear && <p className="text-red-500 text-sm">Expiry year is required</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700">CVV</label>
                    <input
                      type="text"
                      {...register('cvv', { required: true })}
                      placeholder="Enter your CVV"
                      className="bg-white text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
                    />
                    {errors.cvv && <p className="text-red-500 text-sm">CVV is required</p>}
                  </div>
                </div>
              )}
              {selectedPaymentMethod === 'PayPal' && (
                <div>
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    {...register('password', { required: true })}
                    placeholder="Enter your PayPal password"
                    className="bg-white text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                </div>
              )}
              <button
                type="submit"
                disabled={!selectedPaymentMethod}
                className={`w-full py-3 rounded-lg font-semibold ${selectedPaymentMethod ? 'bg-blue-500 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
              >
                Submit Payment
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;








// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { FaCreditCard, FaPaypal } from 'react-icons/fa';
// import { useForm } from 'react-hook-form';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import { savePaymentDetails } from '../paymentSlice'; // Adjust the import path as needed
// import { addPurchaseDetails } from '../purchaseSlice';
// import { clearCart } from '../cartSlice'; // Import clearCart action
// import UserNavbar from './UserNavbar';

// // Helper function to detect card type
// const detectCardType = (cardNumber) => {
//   if (/^4/.test(cardNumber)) {
//     return 'Visa';
//   } else if (/^5[1-5]/.test(cardNumber)) {
//     return 'MasterCard';
//   } else if (/^6/.test(cardNumber)) {
//     return 'Discover';
//   } else if (/^2(0[2-9]|[1-9][0-9])/.test(cardNumber)) {
//     return 'Rupay';
//   } else {
//     return 'Unknown';
//   }
// };

// const PaymentPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState(null);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
//   const [cardType, setCardType] = useState(''); // State for card type
//   const { items, cartTotal } = useSelector((state) => state.cart);
//   const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

//   useEffect(() => {
//     axios.get('http://localhost:8085/users/' + sessionStorage.getItem("userid"))
//       .then(response => {
//         setUserDetails(response.data);
//         setValue('username', response.data.username);
//         setValue('email', response.data.email);
//         setValue('address', response.data.address);
//       })
//       .catch(error => console.error('Error fetching user details:', error));
//   }, [setValue]);

//   // Watch card number input to detect card type
//   const cardNumber = watch('cardNumber', '');

//   useEffect(() => {
//     setCardType(detectCardType(cardNumber));
//   }, [cardNumber]);

//   const handlePaymentMethodChange = (method) => {
//     setSelectedPaymentMethod(method);
//   };

//   const onSubmit = async (data) => {
//     if (!data.address) {
//       Swal.fire('Error', 'Address field should not be empty', 'error');
//       return;
//     }

//     // Validate payment method details here...
//     if (selectedPaymentMethod === 'CreditCard') {
//       if (!data.cardNumber || data.cardNumber.length !== 16 || isNaN(data.cardNumber)) {
//         Swal.fire('Error', 'Card number must be 16 digits long and numeric', 'error');
//         return;
//       }
//       if (!data.expiryMonth || data.expiryMonth < 1 || data.expiryMonth > 12) {
//         Swal.fire('Error', 'Expiry month must be between 1 and 12', 'error');
//         return;
//       }
//       if (!data.expiryYear || data.expiryYear <= new Date().getFullYear()) {
//         Swal.fire('Error', 'Expiry year must be greater than the current year', 'error');
//         return;
//       }
//       if (!data.cvv || data.cvv.length !== 3 || isNaN(data.cvv)) {
//         Swal.fire('Error', 'CVV must be 3 digits long and numeric', 'error');
//         return;
//       }
//     } else if (selectedPaymentMethod === 'PayPal') {
//       if (!data.password || data.password.length !== 6 || isNaN(data.password)) {
//         Swal.fire('Error', 'Password must be exactly 6 digits long and numeric', 'error');
//         return;
//       }
//     }

//     // Calculate totalAmount safely
//     const totalAmount = typeof cartTotal === 'number' ? cartTotal : 0;

//     Swal.fire('Success', 'Payment completed successfully', 'success').then(() => {
//       const paymentDetails = {
//         items,
//         totalAmount,
//         timeOfPurchase: new Date().toISOString(),
//       };

//       // Store payment details in sessionStorage
//       const userId = sessionStorage.getItem("userid");
//       sessionStorage.setItem(`paymentDetails_${userId}`, JSON.stringify(paymentDetails));

//       dispatch(addPurchaseDetails({
//         method: selectedPaymentMethod,
//         ...data,
//         items, // Include cart items
//         totalAmount, // Total amount of the purchase
//         timeOfPurchase: new Date().toISOString(), // Timestamp of purchase
//       }));

//       // Clear the cart
//       dispatch(clearCart());

//       // Redirect to purchase summary page
//       navigate('/purchase-summary', { state: { paymentDetails } });
//     });
//   };

//   if (!userDetails) {
//     return <p>Loading...</p>;
//   }

//   // Ensure cartTotal is a number before calling toFixed
//   const formattedCartTotal = (typeof cartTotal === 'number' ? cartTotal : 0).toFixed(2);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <UserNavbar />
//       <main className="p-6">
//         <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment</h1>

//           {/* User Details Section */}
//           <section className="mb-6">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Details</h2>
//             <div className="bg-gray-200 p-4 rounded-lg">
//               <div className="flex justify-between mb-2">
//                 <label className="font-medium text-gray-700">Username:</label>
//                 <input
//                   type="text"
//                   value={userDetails.username}
//                   readOnly
//                   className="bg-gray-100 text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
//                 />
//               </div>
//               <div className="flex justify-between mb-2">
//                 <label className="font-medium text-gray-700">Email:</label>
//                 <input
//                   type="email"
//                   value={userDetails.email}
//                   readOnly
//                   className="bg-gray-100 text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
//                 />
//               </div>
//               <div className="flex justify-between mb-2">
//                 <label className="font-medium text-gray-700">Address:</label>
//                 <input
//                   type="text"
//                   {...register('address', { required: true })}
//                   placeholder="Enter your address"
//                   className="bg-white text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
//                 />
//                 {errors.address && <p className="text-red-500 text-sm">Address field should not be empty</p>}
//               </div>
//             </div>
//           </section>

//           {/* Cart Items Section */}
//           <section className="mb-6">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cart Summary</h2>
//             {items.length === 0 ? (
//               <p className="text-center text-gray-500">Your cart is empty.</p>
//             ) : (
//               <ul className="space-y-4">
//                 {items.map(item => (
//                   <li key={item.id} className="flex justify-between items-center border-b py-4">
//                     <div className="flex items-center space-x-4">
//                       <img
//                         src={`data:image/jpeg;base64,${item.picture}`}
//                         alt={item.materialName}
//                         className="w-16 h-16 object-cover rounded"
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
//             )}
//             <div className="mt-4 text-right">
//               <h2 className="text-2xl font-semibold text-gray-800">Total: Rs.{formattedCartTotal}</h2>
//             </div>
//           </section>

//           {/* Payment Methods Section */}
//           <section>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Methods</h2>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-4">
//                   <input
//                     type="radio"
//                     id="creditCard"
//                     name="paymentMethod"
//                     value="CreditCard"
//                     onChange={() => handlePaymentMethodChange('CreditCard')}
//                   />
//                   <label htmlFor="creditCard" className="text-gray-800">Credit Card</label>
//                 </div>
//                 {selectedPaymentMethod === 'CreditCard' && (
//                   <div className="space-y-4">
//                     <div className="mb-2">
//                       <label htmlFor="cardNumber" className="block text-gray-700">Card Number:</label>
//                       <input
//                         type="text"
//                         id="cardNumber"
//                         {...register('cardNumber', { required: true })}
//                         placeholder="1234 5678 9012 3456"
//                         className="bg-white text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
//                       />
//                       {errors.cardNumber && <p className="text-red-500 text-sm">Card number is required</p>}
//                     </div>
//                     <div className="flex space-x-4 mb-2">
//                       <div className="flex-1">
//                         <label htmlFor="expiryMonth" className="block text-gray-700">Expiry Month:</label>
//                         <input
//                           type="number"
//                           id="expiryMonth"
//                           {...register('expiryMonth', { required: true })}
//                           placeholder="MM"
//                           className="bg-white text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
//                         />
//                         {errors.expiryMonth && <p className="text-red-500 text-sm">Expiry month is required</p>}
//                       </div>
//                       <div className="flex-1">
//                         <label htmlFor="expiryYear" className="block text-gray-700">Expiry Year:</label>
//                         <input
//                           type="number"
//                           id="expiryYear"
//                           {...register('expiryYear', { required: true })}
//                           placeholder="YYYY"
//                           className="bg-white text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
//                         />
//                         {errors.expiryYear && <p className="text-red-500 text-sm">Expiry year is required</p>}
//                       </div>
//                     </div>
//                     <div className="mb-2">
//                       <label htmlFor="cvv" className="block text-gray-700">CVV:</label>
//                       <input
//                         type="text"
//                         id="cvv"
//                         {...register('cvv', { required: true })}
//                         placeholder="123"
//                         className="bg-white text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
//                       />
//                       {errors.cvv && <p className="text-red-500 text-sm">CVV is required</p>}
//                     </div>
//                   </div>
//                 )}
//                 <div className="flex items-center space-x-4">
//                   <input
//                     type="radio"
//                     id="paypal"
//                     name="paymentMethod"
//                     value="PayPal"
//                     onChange={() => handlePaymentMethodChange('PayPal')}
//                   />
//                   <label htmlFor="paypal" className="text-gray-800">PayPal</label>
//                 </div>
//                 {selectedPaymentMethod === 'PayPal' && (
//                   <div className="mb-4">
//                     <label htmlFor="password" className="block text-gray-700">PayPal Password:</label>
//                     <input
//                       type="password"
//                       id="password"
//                       {...register('password', { required: true })}
//                       placeholder="Enter your PayPal password"
//                       className="bg-white text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
//                     />
//                     {errors.password && <p className="text-red-500 text-sm">PayPal password is required</p>}
//                   </div>
//                 )}
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                 >
//                   Complete Payment
//                 </button>
//               </div>
//             </form>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PaymentPage;
