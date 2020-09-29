import { createActions } from 'redux-actions';
import axios from 'axios';

import { removeFromWishlist } from './wishlist';

export const { addCartItem, deleteCartItem, getCartItems } = createActions(
  'ADD_CART_ITEM',
  'DELETE_CART_ITEM',
  'GET_CART_ITEMS'
);

// Remove item from wishlist if it is being added to cart.
export const addItemToCart = game => async (dispatch, getState) => {
  const { user } = getState().auth;

  if (user && user.wishlist.some(item => item.id === game.id)) {
    try {
      await axios({
        method: 'DELETE',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlist/${game.id}`,
        withCredentials: true
      });

      dispatch(removeFromWishlist(game.id));
    } catch (error) {
      console.log(error);
    }
  }
  dispatch(addCartItem(game));
};
