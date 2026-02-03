import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage';
import { Router } from '@angular/router';
import { Music } from '../services/music';
import { IonicModule,ModalController,IonRouterOutlet } from '@ionic/angular';
import { SongsModalPage } from '../songs-modal/songs-modal.page';
import { Artist } from './artist.interface';
import { FavoriteService } from '../services/favorite';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonicModule,
    CommonModule,   
  ],
   /*providers: [ModalController]*/
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  song: any = {
    name:'',
    preview_url: '',
    playing: false
  };
 

  // Tema 
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorOscuro;
  presentingElement: any = undefined;

  //Estado 
  introVisited = false;
  localArtists: Artist[] = [];


  //Slides 
  genres = [
    {
      title: "Música clásica",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLGpLWtd6BNbPf05_NmHIvElV1GSJosYIwiw&s",
      description: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto..."
    },
    {
      title: "Rock",
      image: "https://www.billboard.com/wp-content/uploads/2025/02/021025-Rock-Love-Songs-Staff-Picks-billboard-1548.jpg?w=942&h=628&crop=1",
      description: "El rock es un amplio género de música popular originado a principios de la década de 1950..."
    },
    {
      title: "Jazz",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXqL5qthMzUhxj8OXgxtB5JyqvYFnwKsakOw&s",
      description: "El jazz es un género musical estadounidense nacido a finales del siglo XIX..."
    }
  ];

  currentSong: any = {};
  tracks: any;
  albums: any;
  newTime: any;
  userId = 1; 

  constructor(
    private storageService: StorageService,
    private router: Router,
    private musicService: Music,
    private modalCtrl: ModalController,
    private ionRouterOutlet: IonRouterOutlet,
    private favService: FavoriteService
  ) {}

  //Ciclo de vida NGONINIT
  /*async ngOnInit() {
  //get local artists
  //this.simularCargarDatos();
  this.localArtists = await this.musicService.getArtists();
  this.loadAlbums(); 
  this.loadTracks();
  await this.loadStorageData();
  this.presentingElement = this.ionRouterOutlet.nativeEl;
  console.log('Artistas locales cargados:', this.localArtists);

  }*/

  async ngOnInit() {
  try {
    this.localArtists = (await this.musicService.getArtists()) || [];// API real
    this.albums = await this.musicService.getAlbums();  // Reemplaza loadAlbums()
    this.tracks = await this.musicService.getTracks();  // Reemplaza loadTracks()
    await this.loadStorageData();
    this.loadAllFavorites();
    this.presentingElement = this.ionRouterOutlet.nativeEl;
    console.log('Artistas locales cargados:', this.localArtists);  // Ok aquí
  } catch (error) {
    console.error('Error cargando datos en ngOnInit:', error);
  }
}

  loadTracks() {
    this.musicService.getTracks().then(tracks =>{
      this.tracks = tracks;
      console.log(this.tracks,"las canciones")
    })
  }

    loadAlbums() {
    this.musicService.getAlbums().then(albums =>{
      this.albums = albums;
      console.log(this.albums,"los albums")
    })
  }

  async ionViewWillEnter() {
    const visited = await this.storageService.get('introVisited');
    this.introVisited = !!visited;

    await this.simularCargarDatos();
  }

  // Navegación 
  goToIntro() {
    this.router.navigateByUrl('/intro');
  }

  //  Tema 
  async cambiarColor() {
    this.colorActual =
      this.colorActual === this.colorOscuro
        ? this.colorClaro
        : this.colorOscuro;

    await this.storageService.set('theme', this.colorActual);
  }

  async loadStorageData() {
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) {
      this.colorActual = savedTheme;
    }
  }

  // Datos simulados
  async simularCargarDatos() {
    const data = await this.obtenerDatosSimulados();
    console.log('datos Simulados: ', data);
  }

  obtenerDatosSimulados() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(['Rock', 'Pop', 'Jazz']);
      }, 3500);
    });
  }

  /*getLocalArtists() {
  // los artistas del servicio
  const res = this.musicService.getLocalArtists();
  this.localArtists = res.artists as Artist[];
  
  console.log("Artistas cargados con sus imágenes del JSON:", this.localArtists);

  }*/

  async showSongs(album: any) {

  console.log('Album clickeado:', album);

  const songs = await this.musicService.getSongsByAlbum(album.id);

  console.log('Songs recibidas:', songs);

  if (!songs || songs.length === 0) {
    alert('Este álbum no tiene canciones');
    return;
  }

  const modal = await this.modalCtrl.create({
    component: SongsModalPage,
    componentProps: {
      songs: songs,
      title: album.name,
      image: album.image
    }
  });

  modal.onDidDismiss().then((result) => {
    if (result.data) {
      this.song = result.data; // canción seleccionada
        console.log("Canción elegida:", this.song);
      this.song.playing = false;  // para que se actualice el play/pause
    
    }
  });

  await modal.present();
}


  /*async showSongs(album: any) {
  // 1. Obtener las canciones
  const songs = await this.musicService.getSongsByAlbum(album.id);
    console.log('Canciones por álbum:', songs);  // Agrega para ver si llegan datos
  if (!songs || songs.length === 0) {
    console.warn('No hay canciones para este álbum');  // Agrega validación
    return;
  }
  const modal = await this.modalCtrl.create({
    component: SongsModalPage,
    componentProps: {
      songs: songs,
      title: album.name,
      image: album.image
    }
  });

  // 2. RECIBIR LA CANCIÓN:sobreescribir this.song con la elegida
  modal.onDidDismiss().then((result) => {
    if (result.data) {
      this.song = result.data; // Aquí 'song' ya tiene los datos reales de la API
      console.log("Canción seleccionada:", this.song);
    }
  });

  return await modal.present();
}
*/
  
async showSongsByArtist(artist: any) {
  // 1. Usar el id para ir a la API real
  const songs = await this.musicService.getTracksByArtist(artist.id);
  
  console.log("Canciones del artista " + artist.name + ":", songs);
 
  // 2. Pasar AMBOS datos al modal: las canciones y el objeto artista pa la foto
  const modal = await this.modalCtrl.create({
    component: SongsModalPage,
    initialBreakpoint: 0.75, // Empieza ocupando el 75% de la pantalla
      breakpoints: [0, 0.5, 0.75, 1], // Permite que el usuario lo arrastre
      presentingElement: this.presentingElement,
    componentProps: {
      songs: songs,
      title: artist.name,
      image: artist.image || '',
      artist: artist 
    }
  }); 

  modal.onDidDismiss().then((result) => {  // Agrega esto para recibir canción
    if (result.data) {
      this.song = result.data;
      console.log("Canción seleccionada:", this.song);
      this.loadFavoritesForSong(this.song);  // Agrega para chequear favoritos
    }
    });
  return await modal.present();
}
/**play(){
  //preview url es un archivo de musica
  this.currentSong = new Audio(this.song.preview_url);
  this.currentSong.play();
  this.currentSong.addEventListener("timeupdate", ()=>{
  this.newTime = this.currentSong.currentTime / this.currentSong.duration/10;
  });
  this.song.playing = true;

} 


play() {
  if (!this.song?.preview_url) {
    console.warn('No hay preview_url para esta canción');  // Agrega log para depurar
    return;
  }
  this.currentSong = new Audio(this.song.preview_url);
  this.currentSong.play().catch((error:any) => {
    console.error('Error reproduciendo audio:', error);  // Agrega catch para errores
  });
  this.currentSong.addEventListener("timeupdate", () => {
    if (this.currentSong) {  // Agrega chequeo null
      this.newTime = this.currentSong.currentTime / this.currentSong.duration;
    }
  });
  this.song.playing = true;
}
**/

// HomePage.ts

// Toggle favorito usando el FavoriteService
toggleFavorite(song: any) {
  const userId = 1; // usuario actual, puedes reemplazar con login real

  if (song.isFavorite) {
    // Si ya es favorito, eliminarlo usando id del favorito
    this.favService.deleteFavorite(song.favoriteId).subscribe({
      next: () => {
        song.isFavorite = false;
        song.favoriteId = null;
      },
      error: (err) => console.error('Error al eliminar favorito', err)
    });
  } else {
    // Agregar a favoritos
    this.favService.addFavorite(userId, song.id).subscribe({
      next: (res: any) => {
        song.isFavorite = true;
        song.favoriteId = res.id; // guardar id del favorito que devuelve la API
      },
      error: (err) => console.error('Error al agregar favorito', err)
    });
  }
}

// Reproducir canción para que no se superpongan
play(song: any) {
  // 1. Detener la canción actual si existe
  if (this.currentSong && this.currentSong instanceof Audio) {
    this.currentSong.pause();
    this.currentSong.currentTime = 0; // reiniciar
  }

  // 2. Validar preview_url
  if (!song.preview_url) {
    console.warn('No hay preview_url para esta canción');
    return;
  }

  // 3. Crear un nuevo Audio con cache-buster para forzar recarga
  this.currentSong = new Audio(song.preview_url + '?t=' + new Date().getTime());

  // 4. Reproducir la canción
  this.currentSong.play().catch((err: any) => console.error('Error audio', err));

  // 5. Actualizar progreso
  this.currentSong.addEventListener('timeupdate', () => {
    if (this.currentSong) {
      this.newTime = this.currentSong.currentTime / this.currentSong.duration;
    }
  });

  // 6. Pausar visualmente la canción anterior
  if (this.song && this.song !== song) {
    this.song.playing = false;
  }

  // 7. Marcar la canción seleccionada como “playing”
  this.song = song;
  this.song.playing = true;
}



pause() {
  if (this.currentSong && this.currentSong instanceof Audio) {
    this.currentSong.pause();
    this.song.playing = false;
  }
}


// Cargar favoritos de un track cuando lo seleccionas
loadFavoritesForSong(song: any) {
  const userId = 1;
  this.favService.getUserFavorites(userId).subscribe((favorites: any[]) => {
    const fav = favorites.find(f => f.track_id === song.id);
    if (fav) {
      song.isFavorite = true;
      song.favoriteId = fav.id;
    } else {
      song.isFavorite = false;
      song.favoriteId = null;
    }
  });
}


formatTime(seconds: number) {
  if(!seconds || isNaN(seconds)) return "0:00";
  const minutes= Math.floor(seconds/60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2,'0')}`;
}

getRemainingTime() {

  if (!this.currentSong) return 0;
  if (isNaN(this.currentSong.duration)) return 0;
  return this.currentSong.duration - this.currentSong.currentTime;
}



//favorites


loadAllFavorites() {

  this.favService.getUserFavorites(this.userId)
    .subscribe((favorites:any[])=>{

      this.tracks.forEach((song:any)=>{

        const fav = favorites.find(
          f => f.track_id === song.id
        );

        if(fav){
          song.isFavorite = true;
          song.favoriteId = fav.id;
        }

      });

    });

}

}



/*
  async showSongs(albumId: string) {

    //esto es para las canciones del album
    const songs = await this.musicService.getSongsByAlbum(albumId);
    console.log("album id: ",albumId)
    console.log("songs: ",songs);
    //modal
   const modal = await this.modalCtrl.create({
      // El component es la pagina
      component: SongsModalPage,
      //parametros
      componentProps:{
        songs: songs
      }
    }); 

    //al colocar el modal ya refleja la cancion
   
     modal.present();
  }

  */

  //hacer el songbyartist
/* tarea router 

Crear una funcion 
*/ 

// crear dos temas distintos usando las variables de css
//--color-fondo-tarjeta = var(tema-claro--fondo), 
// --color-texto-tarjeta, 
// --color-slide-title, 
// --espaciado-slide

// tener estas para cuando uses colores (algo asi)

//crear variables para el tema, 
// --tema-claro-fondo(tambien oscuro para este, titulo y texto), 
// --tema-claro-texto, 
// tema-claro-titulo, para aplicar esas en las de arriba, 
// en html hacer un boton en cualquiera lado que cuando hagas clicks cambie el color de fondo, las letras sean de otro color
//
// resumen: cambiar mediante el click de un boton el tema de los slides (color)

//tarea: agregar 3 slides con info de generos de musica 