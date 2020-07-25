import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';




@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      }
    ]),
  ]
})
export class AuthModule { }
