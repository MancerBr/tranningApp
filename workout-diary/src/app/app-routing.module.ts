import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {AuthComponent} from './core/layouts/auth/auth.component';
import {MainComponent} from './core/layouts/main/main.component';

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
        loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthModule),
      },
    ],
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
      },
      {
        path: 'workout',
        loadChildren: () => import('./pages/workout/workout.module').then( m => m.WorkoutModule),
      },
      {
        path: 'templates',
        loadChildren: () => import('./pages/templates/templates.module').then( m => m.TemplatesModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsModule),
      },
      {
        path: 'help',
        loadChildren: () => import('./pages/help/help.module').then( m => m.HelpModule),
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
