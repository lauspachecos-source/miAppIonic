import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro-guard';
//agregar el guard del login (cuando tenga el guard configuar aqui tal cual se hizo el intro guard)
import { LoginGuard } from './guards/login-guard';


export const routes: Routes = [
  // LOGIN
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },

  // REGISTER (ANTES del redirect)
  {
    path: 'register',
    loadComponent: () => 
      import('./register/register.page').then(m => m.RegisterPage)
  },

  // INTRO
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then(m => m.IntroPage)
  },

  // HOME 
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate: [IntroGuard, LoginGuard]
  },

  // REDIRECT FINAL
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  }
];
