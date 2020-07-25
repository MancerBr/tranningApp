import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {MainComponent} from './main/main.component';
import {MenuModule} from '../menu/menu.module';
import {AuthComponent} from './auth/auth.component';


@NgModule({
  declarations: [MainComponent, AuthComponent],
  imports: [
    CommonModule,
    IonicModule,
    MenuModule,
  ],
  exports: [MainComponent, AuthComponent],
})
export class LayoutsModule { }
