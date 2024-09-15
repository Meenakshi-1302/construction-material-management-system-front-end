// src/redux/actions.js

// Action Types
export const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS';
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';

// Action Creators
export const setOrderDetails = (details) => ({
  type: SET_ORDER_DETAILS,
  payload: details
});

export const clearOrderDetails = () => ({
  type: CLEAR_ORDER_DETAILS
});
