import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../home/artist.interface';

@Injectable({
  providedIn: 'root',
})
export class Music {
  private urlServer: string = "https://music.fly.dev";  

  constructor(private http: HttpClient) {}  

  // GET tracks
  getTracks() {
    return this.http.get(`${this.urlServer}/tracks`).toPromise();
  }

  // GET albums
  getAlbums() {
    return this.http.get(`${this.urlServer}/albums`).toPromise();
  }

  // GET artists
  // GET artists
  getArtists() {
  return this.http.get<Artist[]>(`${this.urlServer}/artists`).toPromise();  //  <Artist[]> a
  }

  // GET /tracks/artist/:id
  getTracksByArtist(artistId: number | string) {
  return this.http.get<any[]>(`${this.urlServer}/tracks/artist/${artistId}`).toPromise();  // <any[]>
}

  // GET /tracks/album/:id
  getSongsByAlbum(albumId: string) {
  return this.http.get<any[]>(`${this.urlServer}/tracks/album/${albumId}`).toPromise();  // <any[]>
}
 
  // getTracksByArtist
}