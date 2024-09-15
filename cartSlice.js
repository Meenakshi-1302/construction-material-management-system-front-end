import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0,
    cartTotal: 0,
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
      // // Recalculate total items and total price after loading items
      // state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      // state.cartTotal = state.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    },
    addItem(state, action) {
      const newItem = action.payload;
      console.log('Adding Item:', newItem);
      

      const existingItem = state.items.find(item => item.id === newItem.id);
      console.log('Existing Item:', existingItem);

      if (existingItem) {
        // Update the quantity of the existing item
        existingItem.quantity += newItem.quantity;
      } else {
        // Add the new item to the cart
        state.items.push(newItem);
      }

      // Recalculate total items and total price
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.cartTotal = state.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

      console.log('Updated Items:', state.items);
      console.log('Total Items:', state.totalItems);
      console.log('Cart Total:', state.cartTotal);
    },
    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        item.quantity = quantity;

       
      }
       // Recalculate total items and total price
       state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
       state.cartTotal = state.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    },
    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);

      // Recalculate total items and total price
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.cartTotal = state.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalItems = 0;
      state.cartTotal = 0;
    },
  },
});

export const { setItems, addItem, updateItemQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;



// src/redux/cartSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [], // Array to store cart items
//     totalItems: 0,
//     cartTotal: 0,
//   },
//   reducers: {
//     addItem: (state, action) => {
//       const item = action.payload;
//       const existingItem = state.items.find((i) => i.id === item.id);
//       if (existingItem) {
//         existingItem.quantity += item.quantity;
//       } else {
//         state.items.push(item);
//       }
//       state.totalItems += item.quantity;
//       state.cartTotal += item.unitPrice * item.quantity;
//     },
//     removeItem: (state, action) => {
//       const id = action.payload;
//       const itemToRemove = state.items.find(item => item.id === id);
//       if (itemToRemove) {
//         // Update totalItems and cartTotal
//         state.totalItems -= itemToRemove.quantity;
//         state.cartTotal -= itemToRemove.unitPrice * itemToRemove.quantity;

//         // Remove item from cart
//         state.items = state.items.filter(item => item.id !== id);
//       }
//     },
//     updateItemQuantity: (state, action) => {
//       const { id, quantity } = action.payload;
//       const item = state.items.find(item => item.id === id);
//       if (item) {
//         // Update quantity and recalculate totals
//         const oldQuantity = item.quantity;
//         item.quantity = quantity;
//         state.totalItems += (quantity - oldQuantity);
//         state.cartTotal += (quantity - oldQuantity) * item.unitPrice;
//       }
//     },
//     setItems: (state, action) => {
//       state.items = action.payload;
//       state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
//       state.cartTotal = state.items.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
//     }
//   },
//   clearCart: (state) => {
//           state.items = [];
//           state.totalItems = 0;
//           state.cartTotal = 0;
//         },
// });

// export const { addItem, removeItem, updateItemQuantity, setItems, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

