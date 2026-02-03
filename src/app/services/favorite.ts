import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoriteService {

  private api = 'https://music.fly.dev';

  constructor(private http: HttpClient) {}

  // Obtener favoritos de un usuario
  getUserFavorites(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/user_favorites/${userId}`);
  }

  // Agregar un favorito
  addFavorite(userId: number, trackId: number): Observable<any> {
    return this.http.post(`${this.api}/favorite_tracks`, {
      favorite_track: {
        user_id: userId,
        track_id: trackId
      }
    });
  }

 deleteFavorite(id: number) {
  return this.http.delete(`${this.api}/favorite_tracks/${id}`);
}

  // Eliminar favorito por trackId userId 
  deleteFavoriteByTrack(userId: number, trackId: number): Observable<any> {
    return this.getUserFavorites(userId).pipe(
      switchMap(favs => {
        const fav = favs.find(f => f.track_id === trackId);
        if (!fav) return throwError(() => new Error('No se encontró favorito para este track'));
        return this.deleteFavorite(fav.id); // llama al delete 
      })
    );
  }

  // Obtener todos los favoritos 
  getAllFavorites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/favorite_tracks`);
  }
}
