import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const isLogged = await this.storageService.get('isLogged');
    console.log('LOGIN GUARD isLogged:', isLogged);
    
    if (isLogged) {
      return true;
    } else {
      this.router.navigateByUrl('/login', { replaceUrl: true });
      return false;
    }
  }
}