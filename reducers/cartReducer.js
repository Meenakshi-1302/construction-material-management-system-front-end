import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM_QUANTITY } from '../actions/cartActions';

const initialState = {
  items: [],
  totalUniqueItems: 0,
  cartTotal: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const { payload } = action;
      const existingItem = state.items.find(item => item.id === payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === payload.id
              ? { ...item, quantity: item.quantity + payload.quantity }
              : item
          ),
          totalUniqueItems: state.totalUniqueItems,
          cartTotal: state.cartTotal + payload.price * payload.quantity,
        };
      } else {
        return {
          ...state,
          items: [...state.items, payload],
          totalUniqueItems: state.totalUniqueItems + 1,
          cartTotal: state.cartTotal + payload.price * payload.quantity,
        };
      }
    }
    case REMOVE_ITEM: {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        totalUniqueItems: state.totalUniqueItems - 1,
        cartTotal: state.cartTotal - (itemToRemove.price * itemToRemove.quantity),
      };
    }
    case UPDATE_ITEM_QUANTITY: {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      const newItems = state.items.map(item =>
        item.id === id
          ? { ...item, quantity }
          : item
      );
      const newCartTotal = newItems.reduce((total, item) => total + item.price * item.quantity, 0);
      return {
        ...state,
        items: newItems,
        cartTotal: newCartTotal,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
