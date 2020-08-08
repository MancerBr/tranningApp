import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {MainComponent} from './main/main.component';
import {AuthComponent} from './auth/auth.component';
import {MenuModule} from '../../pages/menu/menu.module';


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
