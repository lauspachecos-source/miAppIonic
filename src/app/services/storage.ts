import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  constructor (private storage: Storage) {
     this.init();
  }

  async init () {
    const storage = await this.storage.create();
    //this._storage = await this.storage.create();
    this._storage = storage
  }

  private async ready() {
    //para preguntar si estamos listos para usar el storage
    if(!this._storage){
      await this.init();
    }
  }
  // puedo setear datos en el storage
  public async set( key: string,value: any ){
    await this.ready();
    return this._storage?.set(key, value); 
  }

  //obtener datos del storage 
  public async get(key: string){ 
    await this.ready(); //verificar que estes ready para la operacion
    return this._storage?.get(key);
  }

   public async clear(){
    await this.ready(); //verificar que estes ready para la operacion
    return this._storage?.clear();
  }

    public async keys(){
    await this.ready(); //verificar que estes ready para la operacion
    return this._storage?.keys();
  }

    public async length(){
    await this.ready(); //verificar que estes ready para la operacion
    return this._storage?.length();
  }
  
}
