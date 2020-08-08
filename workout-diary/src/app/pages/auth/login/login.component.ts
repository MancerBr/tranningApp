import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { StoreState } from '../../../core/store';
import { getAuthError, getAuthSuccess, login } from '../../../core/store/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  error: any;

  private readonly destroy: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<StoreState>,
    private navCtrl: NavController,
  ) {
    this.subscribeOnAuthState();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  login(ev): void {
    ev.preventDefault();
    this.store.dispatch(login({ username: 'username', password: 'password', deviceId: 'deviceId' }));
  }

  navigate(ev) {
    ev.preventDefault();
    this.navCtrl.navigateRoot('/registration', { animated: false });
  }

  subscribeOnAuthState(): void {
    this.store.pipe(
        select(getAuthSuccess),
        filter(item => !!item),
        takeUntil(this.destroy),
    ).subscribe((data) => {
      this.navCtrl.navigateRoot('/home', { animated: false });
    });

    this.store.pipe(
        select(getAuthError),
        filter(item => !!item),
        takeUntil(this.destroy),
    ).subscribe((error: any) => {
      this.error = error;
    });
  }

}
