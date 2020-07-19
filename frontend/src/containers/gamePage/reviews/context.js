import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import { object } from 'prop-types';
import {
  SET_REVIEWS,
  ADD_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
  START_LOADING,
  SET_ERROR
} from './constants';

const ReviewStateContext = createContext();
const ReviewDispatchContext = createContext();

const reducer = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload.reviews,
        numTotalReviews: action.payload.numTotalReviews,
        noUserReview: action.payload.noUserReview
      };

    case ADD_REVIEW:
      return {
        ...state,
        reviews: [action.payload.review, ...state.reviews],
        noUserReview: false,
        numTotalReviews: state.numTotalReviews + 1,
        loading: false
      };

    case DELETE_REVIEW: {
      return {
        ...state,
        reviews: state.reviews.filter(
          review => review.id !== action.payload.id
        ),
        noUserReview: true,
        numTotalReviews: state.numTotalReviews - 1,
        loading: false
      };
    }

    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review.id === action.payload.id ? action.payload.review : review
        ),
        loading: false
      };

    case START_LOADING: {
      return { ...state, loading: true };
    }

    case SET_ERROR: {
      return { ...state, error: action.payload.error, loading: false };
    }

    default:
      return state;
  }
};

export const ReviewProvider = ({ children, initialState }) => {
  const [state, dispatch] = useReducer(reducer, {
    reviews: initialState?.reviews || null,
    noUserReview: false,
    numTotalReviews: 0,
    loading: false,
    error: null
  });

  return (
    <ReviewStateContext.Provider value={state}>
      <ReviewDispatchContext.Provider value={dispatch}>
        {children}
      </ReviewDispatchContext.Provider>
    </ReviewStateContext.Provider>
  );
};

ReviewProvider.propTypes = {
  children: object.isRequired,
  initialState: object
};

ReviewProvider.defaultProps = {
  initialState: {}
};

export const useReviewState = () => {
  const state = useContext(ReviewStateContext);

  if (!state) {
    throw new Error('Must use this hook inside the Review Provider');
  }

  return state;
};

export const useReviewDispatch = () => {
  const dispatch = useContext(ReviewDispatchContext);

  if (!dispatch) {
    throw new Error('Must use this hook inside the Review Provider');
  }

  const setReviews = (reviews, numTotalReviews, noUserReview) => {
    dispatch({
      type: SET_REVIEWS,
      payload: {
        reviews,
        numTotalReviews,
        noUserReview
      }
    });
  };

  const addReview = async (gameId, data, user) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `http://localhost:5000/api/v1/games/${gameId}/reviews`,
        withCredentials: true,
        data
      });

      dispatch({
        type: ADD_REVIEW,
        payload: {
          review: {
            ...response.data.review,
            likes: [],
            dislikes: [],
            user
          }
        }
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: { error: error.response.data.message }
      });
    }
  };

  const deleteReview = async reviewId => {
    try {
      await axios({
        method: 'DELETE',
        url: `http://localhost:5000/api/v1/reviews/${reviewId}`,
        withCredentials: true
      });

      dispatch({ type: DELETE_REVIEW, payload: { id: reviewId } });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: { error: error.response.data.message }
      });
    }
  };

  const updateReview = async (reviewId, data) => {
    try {
      const response = await axios({
        method: 'PATCH',
        url: `http://localhost:5000/api/v1/reviews/${reviewId}`,
        withCredentials: true,
        data
      });

      dispatch({
        type: UPDATE_REVIEW,
        payload: { id: reviewId, review: response.data.review }
      });

      return true;
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: { error: error.response.data.message }
      });
      return false;
    }
  };

  return { setReviews, addReview, deleteReview, updateReview };
};
