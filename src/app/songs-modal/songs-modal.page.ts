import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { FavoriteService } from '../services/favorite';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class SongsModalPage implements OnInit {

  @Input() songs: any[] = [];
   @Input() title: string = ''; 
   @Input() image: string = '';
  userId = 1;

  favorites: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private favService: FavoriteService
  ) {}

  ngOnInit() {
    console.log('MODAL INICIADO');
    console.log('Songs:', this.songs);
    this.loadFavorites();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  selectSong(song: any) {
    console.log('Canción enviada al Home:', song);
    this.modalCtrl.dismiss(song);
  }

  loadFavorites() {
    console.log('Cargando favoritos...');

    this.favService.getUserFavorites(this.userId).subscribe({
      next: (res: any[]) => {
        console.log('Favoritos API:', res);

        this.favorites = res;

        this.syncFavorites();
      },
      error: err => {
        console.error('Error cargando favoritos:', err);
      }
    });
  }

  syncFavorites() {
    console.log('Sincronizando favoritos con lista...');

    this.songs.forEach(song => {

      const fav = this.favorites.find(f => f.track_id === song.id);

      if (fav) {
        song.isFavorite = true;
        song.favoriteId = fav.id;
      } else {
        song.isFavorite = false;
        song.favoriteId = null;
      }

      console.log(
        'Song:',
        song.name,
        'isFavorite:',
        song.isFavorite,
        'favoriteId:',
        song.favoriteId
      );

    });
  }

  toggleFavorite(song: any) {

    console.log('CLICK FAVORITO:', song.name);
    console.log('Estado actual:', song.isFavorite, song.favoriteId);

    if (song.isFavorite) {
      this.removeFavorite(song);
    } else {
      this.addFavorite(song);
    }
  }

  addFavorite(song: any) {

    console.log('Agregando favorito:', song.name);

    this.favService.addFavorite(this.userId, song.id).subscribe({

      next: (res: any) => {

        console.log('Respuesta API ADD:', res);

        song.isFavorite = true;
        song.favoriteId = res.id;

        this.favorites.push({
          id: res.id,
          track_id: song.id
        });

        this.forceRefresh(song);

      },

      error: err => {
        console.error('Error ADD:', err);
      }

    });
  }

  removeFavorite(song: any) {

    console.log('Quitando favorito:', song.name);
    console.log('favoriteId:', song.favoriteId);

    if (!song.favoriteId) {
      console.error('NO HAY favoriteId');
      return;
    }

    this.favService.deleteFavorite(song.favoriteId).subscribe({

      next: () => {

        console.log('Favorito eliminado API');

        song.isFavorite = false;
        song.favoriteId = null;

        this.favorites = this.favorites.filter(
          f => f.track_id !== song.id
        );

        this.forceRefresh(song);

      },

      error: err => {
        console.error('Error DELETE:', err);
      }

    });
  }

  forceRefresh(song: any) {

    console.log('Forzando refresco:', song.name);

    const index = this.songs.findIndex(s => s.id === song.id);

    if (index !== -1) {

      this.songs[index] = {
        ...this.songs[index],
        isFavorite: song.isFavorite,
        favoriteId: song.favoriteId
      };

      this.songs = [...this.songs];

    }

    console.log('Estado final:', song.isFavorite);
  }

}
