import { createActions } from 'redux-actions';
import axios from 'axios';

export const { loginSuccess, loginError, loginLoading } = createActions(
  'LOGIN_SUCCESS',
  'LOGIN_ERROR',
  'LOGIN_LOADING'
);

export const startLogin = ({ email, password }) => async dispatch => {
  dispatch(loginLoading());
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/users/login',
      withCredentials: true,
      data: {
        email,
        password
      }
    });
    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    dispatch(loginError(error.response.data.message));
  }
};
