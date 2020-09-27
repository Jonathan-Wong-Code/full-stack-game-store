import {
  loginSuccess,
  loginError,
  loginLoading,
  clearLoginError,
  logout,
  loadingEnded,
  updateMe
} from '../actions/auth';

import { addToWishlist, removeFromWishlist } from '../actions/wishlist';

const initialState = {
  user: {
    wishlist: []
  },
  loading: true,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginSuccess().type: {
      return { ...state, user: action.payload, loading: false, error: null };
    }

    case loginError().type: {
      return {
        ...state,
        error: action.payload,
        loading: false,
        user: null
      };
    }

    case loginLoading().type:
      return {
        ...state,
        loading: true
      };

    case clearLoginError().type:
      return {
        ...state,
        loading: false,
        error: null
      };

    case loadingEnded().type:
      return {
        ...state,
        loading: false
      };

    case logout().type:
      return {
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
