import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {HelpComponent} from './help.component';



@NgModule({
  declarations: [HelpComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HelpComponent,
      }
    ]),
  ]
})
export class HelpModule { }
