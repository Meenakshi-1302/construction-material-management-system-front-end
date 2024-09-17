import React, { useEffect, useState } from 'react';

const PaymentDetailsPage = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);

  useEffect(() => {
    // Fetch payment details for all users
    const storedDetails = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('paymentDetails_')) {
        const details = sessionStorage.getItem(key);
        console.log(details)
        if (details) {
          storedDetails.push(JSON.parse(details));
        }
      }
    }
    setPaymentDetails(storedDetails);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Details</h1>

        {paymentDetails.length === 0 ? (
          <p className="text-center text-gray-500">No payment details found.</p>
        ) : (
          <ul className="space-y-4">
            {paymentDetails.map((details, index) => (
              <li key={index} className="border-b py-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Purchase {index + 1}</h2>
                <p className="text-gray-800">Total Amount: Rs.{details.totalAmount.toFixed(2)}</p>
                <p className="text-gray-600">Time of Purchase: {details.timeOfPurchase}</p>
                <div className="mt-2">
                  <h3 className="text-lg font-semibold text-gray-700">Items:</h3>
                  <ul className="space-y-2">
                    {details.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex justify-between items-center border-b py-2">
                        <div>
                          <h4 className="text-gray-800">{item.name}</h4>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-gray-900">Rs.{(item.unitPrice * item.quantity).toFixed(2)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PaymentDetailsPage;
