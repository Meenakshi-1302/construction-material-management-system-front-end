import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    paymentDetails: [],
  },
  reducers: {
    savePaymentDetails: (state, action) => {
      state.paymentDetails.push(action.payload);
    },
  },
});

export const { savePaymentDetails } = paymentSlice.actions;
export default paymentSlice.reducer;
