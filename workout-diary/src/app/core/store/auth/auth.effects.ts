import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { login, loginError, loginSuccess, setTokens } from './auth.actions';
import { AuthService } from '../../services';


@Injectable({ providedIn: 'root' })
export class AuthEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        mergeMap(({ email, password }) => this.authService.login({ email, password })
            .pipe(
                mergeMap(({ access_token, refresh_token }) => of(
                    setTokens({ access_token, refresh_token }),
                    loginSuccess(),
                )),
                catchError((error: any) => of(loginError({ error })),
            )),
        )),
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
    ) {}
}
