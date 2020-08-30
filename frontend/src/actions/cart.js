import { createActions } from 'redux-actions';

export const { addCartItem, deleteCartItem, getCartItems } = createActions(
  'ADD_CART_ITEM',
  'DELETE_CART_ITEM',
  'GET_CART_ITEMS'
);
