import { Injectable } from '@angular/core';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private storage: StorageService
  ) { }

  

  async registerUser(data: any) {

    return new Promise(async (accept, reject) => {

      const users =
        await this.storage.get('users') || [];

      const exists = users.find(
        (u: any) => u.email === data.email
      );

      if (exists) {
        reject('Este correo ya existe');
        return;
      }

      const cleanUser = {
      ...data,
      email: data.email.trim(),
      password: data.password.trim()
      };

      users.push(cleanUser);

      await this.storage.set('users', users);

      accept('Usuario registrado');

    });

  }

}