import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

import { StoreState } from '../../../core/store';
import { getAuthError, getAuthSuccess, login } from '../../../core/store/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.component.scss'],
})
export class LoginComponent implements OnDestroy {

  formGroup: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  error: any;

  private readonly destroy: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<StoreState>,
    private navCtrl: NavController,
  ) {
    this.subscribeOnAuthState();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  login(ev): void {
    ev.preventDefault();
    const {email = null, password = null, } = this.formGroup.value;
    this.store.dispatch(login({ email, password }));
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
      this.navCtrl.navigateRoot('', { animated: false });
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
