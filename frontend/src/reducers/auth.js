import {
  loginSuccess,
  loginLoading,
  logout,
  loadingEnded,
  updateMe
} from '../actions/auth';

import { addToWishlist, removeFromWishlist } from '../actions/wishlist';

const initialState = {
  user: null,
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginSuccess().type: {
      return { ...state, user: action.payload, loading: false, error: null };
    }

    case loginLoading().type:
      return {
        ...state,
        loading: true
      };

    case loadingEnded().type: {
      return {
        ...state,
        loading: false
      };
    }

    case logout().type:
      return {
        ...state,
        loading: false,
        error: null,
        user: null
      };

    case updateMe().type:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        loading: false,
        error: null
      };

    case addToWishlist().type: {
      const currentWishlist = state.user.wishlist || [];
      return {
        ...state,
        user: {
          ...state.user,
          wishlist: [...currentWishlist, action.payload]
        },
        loading: false
      };
    }

    case removeFromWishlist().type: {
      const newWishlist = state.user.wishlist.filter(
        item => item.id !== action.payload
      );

      return {
        user: { ...state.user, wishlist: newWishlist, loading: false }
      };
    }

    default:
      return state;
  }
};

export default authReducer;
