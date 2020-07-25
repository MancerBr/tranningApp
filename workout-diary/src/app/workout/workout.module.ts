import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { IonicModule } from '@ionic/angular';

import {WorkoutComponent} from './workout.component';



@NgModule({
  declarations: [WorkoutComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: WorkoutComponent,
      }
    ]),
  ]
})
export class WorkoutModule { }
