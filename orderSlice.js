// orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    currentOrderId: null,
    orders: []
  },
  reducers: {
    setOrderId(state, action) {
      state.currentOrderId = action.payload;
    },
    addOrder(state, action) {
      state.orders.push(action.payload);
    }
  }
});

export const { setOrderId, addOrder } = orderSlice.actions;
export default orderSlice.reducer;
