import { createSelector } from 'reselect';

export const selectCart = state => state && state.cart;

export const selectCartItems = createSelector(
  selectCart,
  cart => cart.cartItems
);
