import { Action, createReducer, on } from '@ngrx/store';
import { login, loginError, loginSuccess } from './auth.actions';

export const authFeatureKey = '[Reducer] Auth';

export interface AuthState {
    loading: boolean;
    success: boolean;
    error: any;
}

export const initialState: AuthState = {
    loading: false,
    success: false,
    error: null,
};

const authReducer = createReducer(
    initialState,
    on(login, (state: AuthState) => ({...state, loading: true, success: false})),
    on(loginSuccess, (state: AuthState) => ({...state, loading: false, success: true})),
    on(loginError, (state: AuthState, { error }) =>  ({...state, loading: false, success: false, error})),
);

export function reducer(state: AuthState | undefined, action: Action) {
    return authReducer(state, action);
}
