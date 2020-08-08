import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { login, loginError, loginSuccess } from './auth.actions';
import { AuthService } from '../../services';

@Injectable({providedIn: 'root'})
export class AuthEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        mergeMap(({ username, password, deviceId }) => this.authService.login({ username, password, deviceId })
            .pipe(
                map(() => loginSuccess({ success: true })),
                catchError((error: any) => of(loginError({ error })),
            )),
        )),
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
    ) {}
}
