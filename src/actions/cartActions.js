// Action Types
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

// Action Creators
export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  payload: id,
});

export const updateItemQuantity = (id, quantity) => ({
  type: UPDATE_ITEM_QUANTITY,
  payload: { id, quantity },
});
