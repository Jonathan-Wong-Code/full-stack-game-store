import { createActions } from 'redux-actions';
import axios from 'axios';
import Router from 'next/router';

export const {
  loginSuccess,
  loginError,
  loginLoading,
  clearLoginError,
  logout
} = createActions(
  'LOGIN_SUCCESS',
  'LOGIN_ERROR',
  'LOGIN_LOADING',
  'CLEAR_LOGIN_ERROR',
  'LOGOUT'
);

export const startLogin = data => async dispatch => {
  dispatch(loginLoading());

  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/users/login',
      withCredentials: true,
      data
    });
    dispatch(loginSuccess(response.data.user));
    Router.push('/');
  } catch (error) {
    dispatch(loginError(error.response.data.message));
  }
};

export const startResetPassword = (data, token) => async dispatch => {
  dispatch(loginLoading());
  try {
    const response = await axios({
      method: 'POST',
      url: `http://localhost:5000/api/v1/users/resetPassword/${token}`,
      withCredentials: true,
      data
    });

    dispatch(loginSuccess(response.data.user));
    Router.push('/');
  } catch (error) {
    dispatch(loginError(error.response.data.message));
  }
};

export const startCheckLoggedIn = () => async dispatch => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/users/checkLoggedIn',
      withCredentials: true
    });

    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    // fail silently
  }
};

export const startSignup = data => async dispatch => {
  dispatch(loginLoading());
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/users/signup',
      withCredentials: true,
      data
    });
    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    dispatch(loginError(error.response.data.message));
  }
};
