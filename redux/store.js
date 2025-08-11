import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import cartReducer from './slices/cartSlice';

export const makeStore = () => configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export const wrapper = createWrapper(makeStore);
