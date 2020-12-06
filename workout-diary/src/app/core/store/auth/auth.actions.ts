import { createAction, props } from '@ngrx/store';

import { Login } from '../../types';

export const login = createAction(
    '[Login Page] Login',
    props<Login>(),
);

export const loginSuccess = createAction(
    '[Login Page] Login success',
);

export const loginError = createAction(
    '[Login Page] Error',
    props<{ error: any; }>(),
);

export const setTokens = createAction(
    '[Login Page] set tokens',
    props<{ access_token?: string; refresh_token?: string; }>(),
);

export const clearTokens = createAction(
    '[Login Page] clear tokens',
);
