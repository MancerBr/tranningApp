import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {MainComponent} from './layouts/main/main.component';
import {AuthComponent} from './layouts/auth/auth.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
      },
    ],
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
      },
      {
        path: 'workout',
        loadChildren: () => import('./workout/workout.module').then( m => m.WorkoutModule),
      },
      {
        path: 'templates',
        loadChildren: () => import('./templates/templates.module').then( m => m.TemplatesModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then( m => m.SettingsModule),
      },
      {
        path: 'help',
        loadChildren: () => import('./help/help.module').then( m => m.HelpModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
