import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const CART_STORAGE_KEY = "restaurant-cart";

// Helper function to load cart from localStorage (client-side only)
const loadCartFromLocalStorage = () => {
  try {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
  return [];
};

// Helper function to save cart to localStorage (client-side only)
const saveCartToLocalStorage = (cartItems) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const initialState = {
  items: [],
  isLoaded: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartLoaded: (state, action) => {
      state.isLoaded = true;
      if (action.payload) {
        state.items = action.payload;
      }
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === newItem.id && item.selectedOption === newItem.selectedOption
      );
      
      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      
      if (state.isLoaded && typeof window !== 'undefined') {
        saveCartToLocalStorage(state.items);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity, selectedOption } = action.payload;
      const itemIndex = state.items.findIndex(
        item => item.id === id && item.selectedOption === selectedOption
      );
      
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity = Math.max(1, quantity);
      }
      
      if (state.isLoaded && typeof window !== 'undefined') {
        saveCartToLocalStorage(state.items);
      }
    },
    removeItem: (state, action) => {
      const { id, selectedOption } = action.payload;
      state.items = state.items.filter(
        item => !(item.id === id && item.selectedOption === selectedOption)
      );
      
      if (state.isLoaded && typeof window !== 'undefined') {
        saveCartToLocalStorage(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      
      if (state.isLoaded && typeof window !== 'undefined') {
        saveCartToLocalStorage(state.items);
      }
    },
    initializeCart: (state) => {
      if (typeof window !== 'undefined') {
        const savedItems = loadCartFromLocalStorage();
        state.items = savedItems;
        state.isLoaded = true;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // Handle server-side rendering hydration
      return {
        ...state,
        ...action.payload.cart,
      };
    });
  },
});

// Export actions
export const { 
  setCartLoaded, 
  addItem, 
  updateQuantity, 
  removeItem, 
  clearCart,
  initializeCart
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartIsLoaded = (state) => state.cart.isLoaded;
export const selectCartTotalPrice = (state) => {
  const totalCents = state.cart.items.reduce((sum, item) => {
    const itemPriceInCents = Math.round(item.price * 100);
    return sum + itemPriceInCents * item.quantity;
  }, 0);
  return totalCents / 100;
};
export const selectCartItemCount = (state) => 
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
