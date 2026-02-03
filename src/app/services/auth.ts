import { Injectable } from '@angular/core';
import { StorageService } from './storage';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'https://music.fly.dev'; // URL del servidor

  constructor(private storageService: StorageService, private http: HttpClient) {}

  // LOCAL + APi
  async loginUser(credentials: any) {
    try {
      // Intentar login por API
      const body = { user: { email: credentials.email, password: credentials.password } };
      const response: any = await firstValueFrom(this.http.post(`${this.apiUrl}/login`, body));

      if (response.status === 'OK') {
        await this.storageService.set('isLogged', true);
        await this.storageService.set('currentUser', response.user);
        return 'Login correcto (API)';
      } else {
        throw new Error(response.msg || 'Error desconocido');
      }
    } catch (err: any) {
      // Si la API falla, intentar login local
      const users = await this.storageService.get('users') || [];
      const user = users.find(
        (u: any) =>
          u.email?.trim() === credentials.email?.trim() &&
          u.password === credentials.password
      );

      if (user) {
        await this.storageService.set('isLogged', true);
        await this.storageService.set('currentUser', user);
        return 'Login correcto (local)';
      } else {
        throw new Error('Correo o contraseña incorrectos');
      }
    }
  }

  // LOGOUT
  async logout() {
    await this.storageService.set('isLogged', false);
    await this.storageService.set('currentUser', null);
  }

  // VERIFICAR SI ESTÁ LOGUEADO
  isLogged() {
    return this.storageService.get('isLogged');
  }

  // OBTENER DATOS DEL USUARIO ACTUAL
  getCurrentUser() {
    return this.storageService.get('currentUser');
  }
}
