import { Action, createReducer, on } from '@ngrx/store';

import { clearTokens, login, loginError, loginSuccess, setTokens } from './auth.actions';
import { AuthService } from '../../services';

export const authFeatureKey = '[Reducer] Auth';

export interface AuthState {
    loading: boolean;
    success: boolean;
    access_token: string;
    refresh_token: string;
    error: any;
}

export const initialState: AuthState = {
    loading: false,
    success: false,
    access_token: null,
    refresh_token: null,
    error: null,
};

const authReducer = createReducer(
    initialState,
    on(login, (state: AuthState) => ({...state, loading: true, success: false})),
    on(loginSuccess, (state: AuthState) => ({...state, loading: false, success: true})),
    on(loginError, (state: AuthState, { error }) =>  ({...state, loading: false, success: false, error})),
    on(setTokens, (state: AuthState, { access_token,  refresh_token}) =>  {
        const token = {
            access_token: access_token || AuthService.getTokens().access_token || null,
            refresh_token: refresh_token || AuthService.getTokens().refresh_token || null,
        }
        AuthService.setTokens(token);
        return { ...state, access_token: token.access_token, refresh_token: token.refresh_token };
    }),
    on(clearTokens, (state: AuthState) =>  {
        AuthService.clearTokens();
        return { ...state, access_token: null };
    }),
    on(loginError, (state: AuthState, { error }) =>  ({...state, loading: false, success: false, error})),
);

export function reducer(state: AuthState | undefined, action: Action) {
    return authReducer(state, action);
}
