import { createActions } from 'redux-actions';
import axios from 'axios';

export const { addToWishlist, removeFromWishlist } = createActions(
  'ADD_TO_WISHLIST',
  'REMOVE_FROM_WISHLIST'
);

export const addItemToWishlist = gameId => async dispatch => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlist`,
      withCredentials: true,
      data: {
        game: gameId
      }
    });

    dispatch(addToWishlist(response.data.wishlistItem));
  } catch (error) {
    console.log(error);
  }
};

export const removeItemFromWishlist = gameId => async dispatch => {
  try {
    await axios({
      method: 'DELETE',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlist/${gameId}`,
      withCredentials: true
    });

    dispatch(removeFromWishlist(gameId));
  } catch (error) {
    console.log(error);
  }
};
