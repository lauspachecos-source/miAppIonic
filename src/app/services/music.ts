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

    // 1. Obtener todos los artistas
  getArtists() {
    return fetch(`${this.urlServer}/artists`).then(
      response => response.json()
    );
  }

  // 2. Obtener canciones por artista 
  async getTracksByArtist(artistId: number | string) {
  try {
    const response = await fetch(`${this.urlServer}/tracks/artist/${artistId}`);
    const data = await response.json();
    return data; // Esto devuelve el array de canciones directamente
  } catch (error) {
    console.error("Error buscando canciones:", error);
    return [];
  }
}
  
  getLocalArtists(){
    return dataArtists;
  }

  getSongsByAlbum(albumId: string) {
    return fetch(`${this.urlServer}/tracks/album/${albumId}`).then(
      response => response.json()
    )
  }

  //Crear un servicio para obtener los artistas desde el servidor api
  // crear un servicio para obtener las cancions de un artista se gace ruta:/tracks/artist/
  
async getSongsByArtist(artistId: any) {
  const response = await fetch(`https://music.fly.dev/tracks/artist/${artistId}`);
  const data = await response.json();
  
  // Como me mostraste que es un array directo [], lo devolvemos tal cual
  return data;
}

   
  
}




  


