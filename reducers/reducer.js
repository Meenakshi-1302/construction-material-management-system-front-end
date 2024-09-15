// src/redux/reducer.js

import { SET_ORDER_DETAILS, CLEAR_ORDER_DETAILS } from './actions';

// Initial State
const initialState = {
  details: []
};

// Reducer
const purchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_DETAILS:
      return {
        ...state,
        details: action.payload
      };
    case CLEAR_ORDER_DETAILS:
      return {
        ...state,
        details: []
      };
    default:
      return state;
  }
};

export default purchaseReducer;
