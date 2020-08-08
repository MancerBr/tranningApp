import { createAction, props } from '@ngrx/store';

import { Login } from '../../types';

export const login = createAction(
    '[Login Page] Login',
    props<Login>(),
);

export const loginSuccess = createAction(
    '[Login Page] Login success',
    props<{ success: boolean; }>(),
);

export const loginError = createAction(
    '[Login Page] Error',
    props<{ error: any; }>(),
);
