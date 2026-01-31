import { Injectable } from '@angular/core';
import { StorageService } from './storage';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private storageService: StorageService){}


  
   //tarea: si el login es exitoso guardar en el storage login:true por ejemplo
    //si es true, en el guard me va a dejar entrar al login
  async loginUser(credentials: any){

  return new Promise(async (accept, reject) => {

    const users =
      await this.storageService.get('users') || [];

    const user = users.find(
    (u: any) =>
    u.email?.trim() === credentials.email?.trim() &&
    u.password === credentials.password
    );

    if (user) {

      await this.storageService.set('isLogged', true);

      accept('Login correcto');

    } else {

      reject('Correo o contraseña incorrectos');

    }

  });

}


  logout(){
    this.storageService.set('isLogged', false);
  }

  isLogged(){
    return this.storageService.get('isLogged');
  }

}
