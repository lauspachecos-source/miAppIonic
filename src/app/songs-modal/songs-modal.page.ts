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
  @Input() artist: any;
  @Input() title: string = '';
  @Input() image: string = '';

  userId = 1; // Usuario logueado
  favorites: any[] = [];

  constructor(private modalCtrl: ModalController, private favService: FavoriteService) {}

  ngOnInit() {
    console.log("Canciones cargadas:", this.songs);
    this.loadFavorites();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  selectSong(song: any) {
    console.log("Canción seleccionada:", song);
    this.modalCtrl.dismiss(song);
  }

  // ================= CARGAR FAVORITOS =================
  loadFavorites() {
    this.favService.getUserFavorites(this.userId).subscribe({
      next: (res: any[]) => {
        console.log("Favoritos obtenidos del servidor:", res);
        this.favorites = res;
        this.markFavorites();
      },
      error: (err) => console.error("Error al cargar favoritos:", err)
    });
  }

  markFavorites() {
  this.songs.forEach(song => {
    // Buscar si la canción actual está en la lista de favoritos
    const fav = this.favorites.find(f => f.track_id === song.id);

    if (fav) {
      song.isFavorite = true;
      song.favoriteId = fav.id;
      console.log("Canción reconocida como favorita:", song.name, "favoriteId:", fav.id);
    } else {
      song.isFavorite = false;
      song.favoriteId = null;
      console.log("Canción NO es favorita:", song.name);
    }
  });
}

toggleFavorite(song: any) {
  if (song.isFavorite) {
    this.removeFav(song);
  } else {
    // Primero, quitar cualquier otra canción que esté marcada como favorita
    const currentFav = this.songs.find(s => s.isFavorite);
    if (currentFav) {
      this.removeFav(currentFav, () => {
        this.addFav(song);
      });
    } else {
      this.addFav(song);
    }
  }
}

addFav(song: any) {
  this.favService.addFavorite(this.userId, song.id).subscribe((res: any) => {
    song.isFavorite = true;
    song.favoriteId = res.id;
    // Actualizar el arreglo de favoritos local
    this.favorites.push({ id: res.id, track_id: song.id });
    console.log("Se agregó a favoritos:", song.name, "favoriteId:", res.id);
  }, err => {
    console.error("Error al agregar favorito:", err);
  });
}

removeFav(song: any, callback?: () => void) {
  this.favService.deleteFavoriteByTrack(this.userId, song.id).subscribe({
    next: () => {
      song.isFavorite = false;
      song.favoriteId = null;
      // Quitar de favoritos local
      this.favorites = this.favorites.filter(f => f.track_id !== song.id);
      console.log("Se eliminó de favoritos:", song.name);
      if (callback) callback();
    },
    error: (err) => {
      console.error("Error al eliminar favorito:", err);
      if (callback) callback();
    }
  });
}
}
