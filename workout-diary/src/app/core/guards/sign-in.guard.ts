import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { getAccessToken } from '../store/auth';
import { AuthService } from '../services';


@Injectable({
  providedIn: 'root'
})
export class SignInGuard implements CanActivate {
  constructor(
      private store: Store<any>,
      private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(getAccessToken),
      map((token: string) => {
        if (AuthService.isTokenExpired(token)) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      }),
      take(1),
    );
  }

}
