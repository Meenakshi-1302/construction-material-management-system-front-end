import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { setItems, updateItemQuantity, removeItem } from '../cartSlice'; // Import Redux actions

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalItems, cartTotal } = useSelector((state) => state.cart); // Get cart state from Redux

  useEffect(() => {
    // Load cart items from session storage or API
    const savedItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    dispatch(setItems(savedItems)); // Update Redux store with saved items
  }, [dispatch]);

  useEffect(() => {
    // Save cart items to session storage
    sessionStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const handleProceedToPay = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-orange-600 text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <Link to="/home" className="text-white-300 hover:none">Continue Shopping</Link>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          {totalItems === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b py-4">
                    <div className="flex items-center">
                    <img
                        src={`data:image/jpeg;base64,${item.picture}`}
                        alt={item.materialName}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                        <p className="text-gray-600">Rs.{item.unitPrice.toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                            className="px-3 py-1 bg-gray-300 text-gray-800 font-semibold rounded-l"
                            disabled={item.quantity <= 1} // Disable if quantity is 1
                          >
                            -
                          </button>
                          <span className="px-4 py-1 bg-gray-200 text-gray-800">{item.quantity}</span>
                          <button 
                            onClick={() => dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                            className="px-3 py-1 bg-gray-300 text-gray-800 font-semibold rounded-r"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => dispatch(removeItem(item.id))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center border-t pt-6">
                <h2 className="text-2xl font-semibold text-gray-800">Total Price: Rs.{cartTotal.toFixed(2)}</h2>
                <button 
                  onClick={handleProceedToPay}
                  className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartPage;
