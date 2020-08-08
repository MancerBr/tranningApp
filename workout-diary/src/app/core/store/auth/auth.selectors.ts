import { createFeatureSelector, createSelector } from '@ngrx/store';

import { authFeatureKey, AuthState } from './auth.reducers';

export const selectAuth = createFeatureSelector<AuthState>(authFeatureKey);

export const getAuthLoading = createSelector(
    selectAuth,
    (state: AuthState) => state && state.loading,
);

export const getAuthSuccess = createSelector(
    selectAuth,
    (state: AuthState) => state && state.success,
);

export const getAuthError = createSelector(
    selectAuth,
    (state: AuthState) => state && state.error,
);
