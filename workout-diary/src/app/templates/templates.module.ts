import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {TemplatesComponent} from './templates.component';
import {NewTemplateComponent} from './new-template/new-template.component';
import {TemplateComponent} from './template/template.component';



@NgModule({
  declarations: [TemplatesComponent, TemplateComponent, NewTemplateComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TemplatesComponent,
      },
      {
        path: 'create',
        component: NewTemplateComponent,
      }
    ]),
  ]
})
export class TemplatesModule { }
