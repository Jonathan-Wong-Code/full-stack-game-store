import { loginSuccess, loginError, loginLoading } from '../actions/auth';

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

    default:
      return state;
  }
};

export default authReducer;
