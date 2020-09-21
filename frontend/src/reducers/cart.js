import { addCartItem, deleteCartItem, getCartItems } from '../actions/cart';

const initialState = {
  cartItems: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case addCartItem().type: {
      const newCartItems = [...state.cartItems, action.payload];
      localStorage.setItem('cart', JSON.stringify(newCartItems));
      return { ...state, cartItems: newCartItems };
    }

    case deleteCartItem().type: {
      const newCartItems = state.cartItems.filter(
        item => item.id !== action.payload
      );

      localStorage.setItem('cart', JSON.stringify(newCartItems));
      return {
        ...state,
        cartItems: newCartItems
      };
    }

    case getCartItems().type: {
      const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
      return { cartItems: storedCartItems };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
