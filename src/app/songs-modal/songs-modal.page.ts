import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class SongsModalPage implements OnInit {
  // Estos son los "receptores" de información
  @Input() songs: any[] = [];
  @Input() artist: any;

  @Input() title: string = ''; // Recibe el nombre de artista como de álbum
  @Input() image: string = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Si esto sale [] en consola, es que ese artista no tiene temas en la API
    console.log("Canciones cargadas:", this.songs);
  }

  async selectSong(song: any){
    console.log("cancion seleccionada: ", song)
    await this.modalCtrl.dismiss(song);
    //para seleccionar la cancion
  }

   closeModal() {
    this.modalCtrl.dismiss();
  }
  
}