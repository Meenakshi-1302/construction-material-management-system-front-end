// purchaseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState: {
    details: [],
  },
  reducers: {
    addPurchaseDetails: (state, action) => {
      state.details.push(action.payload);
    },
    setPurchaseDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { addPurchaseDetails, setPurchaseDetails } = purchaseSlice.actions;
export default purchaseSlice.reducer;
