import React, { createContext, useContext, useReducer } from 'react';
import { object } from 'prop-types';
import {
  SET_REVIEWS,
  ADD_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW
} from './constants';

const ReviewStateContext = createContext();
const ReviewDispatchContext = createContext();

const reducer = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case SET_REVIEWS:
      return { ...state, reviews: action.payload.reviews };

    case ADD_REVIEW:
      return { ...state, reviews: [action.payload.review, ...state.reviews] };

    case DELETE_REVIEW: {
      return {
        ...state,
        reviews: state.reviews.filter(review => review.id !== action.payload.id)
      };
    }

    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review.id === action.payload.id ? action.payload.review : review
        )
      };

    default:
      return state;
  }
};

export const ReviewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    gameReviews: [],
    noUserReview: false,
    numTotalReviews: 0
  });

  return (
    <ReviewStateContext value={state}>
      <ReviewDispatchContext value={dispatch}>{children}</ReviewDispatchContext>
    </ReviewStateContext>
  );
};

ReviewProvider.propTypes = {
  children: object.isRequired
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

  return dispatch;
};
