import { Injectable } from '@angular/core';
import { StorageService } from './storage';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private storageService: StorageService){}

  async loginUser(credentials: any){
    //tarea: si el login es exitoso guardar en el storage login:true por ejemplo
    //si es true, en el guard me va a dejar entrar al login

      return new Promise(async (accept, reject) => {
      if (
        credentials.email == "andrea@gmail.com" &&
        credentials.password =="123456789"
      ){
        await this.storageService.set('isLogged', true);
        accept("login correcto")
      }
      else {
        reject("login incorrecto")
      }
    })
  }

  logout(){
    this.storageService.set('isLogged', false);
  }

  isLogged(){
    return this.storageService.get('isLogged');
  }

}
