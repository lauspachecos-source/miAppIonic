import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro-guard';
//agregar el guard del login (cuando tenga el guard configuar aqui tal cual se hizo el intro guard)
import { LoginGuard } from './guards/login-guard';


export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [LoginGuard, IntroGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then( m => m.IntroPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
];
