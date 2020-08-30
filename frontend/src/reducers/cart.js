import { addCartItem, deleteCartItem, getCartItems } from '../actions/cart';

const initialState = {
  cartItems: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case addCartItem().type: {
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    }

    case deleteCartItem().type: {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };
    }

    case getCartItems().type: {
      return state.cartItems;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
