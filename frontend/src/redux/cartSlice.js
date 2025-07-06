import { createSlice } from '@reduxjs/toolkit';

// Utility to sync cart with localStorage
const saveToStorage = (items) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(i => i._id === newItem._id);

      if (existingItem) {
        if (existingItem.qty < newItem.countInStock) {
          existingItem.qty += 1;
        }
      } else {
        state.items.push({ ...newItem, qty: 1 });
      }

      saveToStorage(state.items);
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(i => i._id !== action.payload);
      saveToStorage(state.items);
    },

    decreaseQty(state, action) {
      const item = state.items.find(i => i._id === action.payload);
      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          state.items = state.items.filter(i => i._id !== action.payload);
        }
      }
      saveToStorage(state.items);
    },

    updateQuantity(state, action) {
      const { _id, qty } = action.payload;
      const item = state.items.find(i => i._id === _id);
      if (item && qty > 0 && qty <= item.countInStock) {
        item.qty = qty;
        saveToStorage(state.items);
      }
    },

    clearCart(state) {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQty,
  updateQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
