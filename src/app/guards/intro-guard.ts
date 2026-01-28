import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage';

@Injectable({
  providedIn : 'root'
})

export class IntroGuard implements CanActivate {
  
  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const visited = await this.storageService.get('introVisited');

    if (visited) {
      return true; // deja entrar al home
    } else {
      this.router.navigateByUrl('/intro', { replaceUrl: true });
      return false;
    }
  }
}