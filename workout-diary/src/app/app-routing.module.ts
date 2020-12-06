import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './core/layouts/auth/auth.component';
import { MainComponent } from './core/layouts/main/main.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SignInGuard } from './core/guards/sign-in.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
      },
      {
        path: 'workout',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/workout/workout.module').then( m => m.WorkoutModule),
      },
      {
        path: 'templates',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/templates/templates.module').then( m => m.TemplatesModule),
      },
      {
        path: 'settings',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsModule),
      },
      {
        path: 'help',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/help/help.module').then( m => m.HelpModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [SignInGuard],
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
