// store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Default is localStorage
// import cartReducer from './cartSlice';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, cartReducer);

// const store = configureStore({
//   reducer: {
//     cart: persistedReducer,
//   },

// });

// export const persistor = persistStore(store);
// export default store;
// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default is localStorage
import cartReducer from './cartSlice'; // Import cartReducer from cartSlice
import paymentReducer from './paymentSlice'; // Import paymentReducer from paymentSlice
import purchaseReducer from './purchaseSlice';
import compareReducer from './compareSlice';

// Configuration for persisting the cart reducer
const persistConfig = {
  key: 'root',
  storage,
};

// Persisted reducer for the cart slice
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// Create the Redux store
const store = configureStore({
  reducer: {
    cart: persistedCartReducer, // Use the persistedReducer for the cart slice
    payments: paymentReducer,   // Add the payment reducer
    purchase: purchaseReducer,
    compare: compareReducer
    
  },
});

// Create a persistor to manage the persisted store
export const persistor = persistStore(store);
export default store;


