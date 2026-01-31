import { Injectable } from '@angular/core';
import * as dataArtists from './artistas.json'

@Injectable({
  providedIn: 'root',
})
export class Music {

  urlServer: string = "https://music.fly.dev"
  constructor(){}

  //Es un servicio: me va a devolver todas las canciones de APIS tracks-get all tracks
  getTracks() {

    //en el Get de API hay una url
    return fetch(`${this.urlServer}/tracks`).then(
      response => response.json() 
    );
    //responde una promesa
  }

  getAlbums() {
    return fetch(`${this.urlServer}/albums`).then(
      response => response.json() 
    );

  }
  
  getLocalArtists(){
    return dataArtists;
  }
}
