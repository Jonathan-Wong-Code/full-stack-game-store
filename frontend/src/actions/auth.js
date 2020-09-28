import { createActions } from 'redux-actions';
import axios from 'axios';
import Router from 'next/router';

export const {
  loginSuccess,
  loginLoading,
  logout,
  loadingEnded,
  updateMe,
  updateMyWishlist
} = createActions(
  'LOGIN_SUCCESS',
  'LOGIN_LOADING',
  'LOGOUT',
  'LOADING_ENDED',
  'UPDATE_ME',
  'UPDATE_MY_WISHLIST'
);

export const startLogin = data => async dispatch => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/users/login',
      withCredentials: true,
      data
    });
    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    return error.response.data.message;
  }
};

export const startResetPassword = (data, token) => async dispatch => {
  try {
    const response = await axios({
      method: 'POST',
      url: `http://localhost:5000/api/v1/users/resetPassword/${token}`,
      withCredentials: true,
      data
    });

    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    return error.response.data.message;
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
    dispatch(loadingEnded());
  }
};

export const startSignup = data => async dispatch => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/users/signup',
      withCredentials: true,
      data
    });
    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    return error.response.data.message;
  }
};

export const startLogout = () => async dispatch => {
  try {
    await axios({
      method: 'GET',
      url: 'http://localhost:5000/api/v1/users/logout',
      withCredentials: true
    });

    dispatch(logout());
  } catch (err) {
    console.log(err.response);
  }
};

export const startPasswordUpdate = data => async dispatch => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/users/updatePassword',
      withCredentials: true,
      data
    });
    dispatch(updateMe(response.data.user));
  } catch (error) {
    return error.response.data.message;
  }
};

// UPDATING
export const updateUser = data => async dispatch => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: 'http://localhost:5000/api/v1/users/updateMe',
      withCredentials: true,
      data
    });

    dispatch(updateMe(response.data.user));
    Router.push('/profile');
  } catch (error) {
    return error.response.data.message;
  }
};
