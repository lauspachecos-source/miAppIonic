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
  // INTRO
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then(m => m.IntroPage)
  },

  // MENU HOME 
  /*{
    path: 'menu/home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate: [IntroGuard, LoginGuard]
  },*/

  //REGISTER 
  {
  path: 'register',
  loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },

// MENU
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then(m => m.MenuPage),
    children:[
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage),
        canActivate: [IntroGuard, LoginGuard]
      }
    ]
  },

  // REDIRECT 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
];
