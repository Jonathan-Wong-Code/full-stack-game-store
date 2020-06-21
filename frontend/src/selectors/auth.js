import { createSelector } from 'reselect';

export const selectAuth = state => state && state.auth;

export const selectAuthUser = createSelector(selectAuth, auth => auth.user);
export const selectAuthError = createSelector(selectAuth, auth => auth.error);
export const selectAuthLoading = createSelector(
  selectAuth,
  auth => auth.loading
);
