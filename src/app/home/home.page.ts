import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage';
import { Router } from '@angular/router';
import { Music } from '../services/music';
import { IonicModule,ModalController,IonRouterOutlet } from '@ionic/angular';
import { SongsModalPage } from '../songs-modal/songs-modal.page';
import { Artist } from './artist.interface';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonicModule,
    CommonModule,   
  ],
   providers: [ModalController],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  song: any = {
    name:'',
    preview_url: '',
    playing: false
  };
  currentSong: any;

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

  tracks: any;
  albums: any;


  constructor(
    private storageService: StorageService,
    private router: Router,
    private musicService: Music,
    private modalCtrl: ModalController,
    private ionRouterOutlet: IonRouterOutlet
  ) {}

  //Ciclo de vida NGONINIT
  async ngOnInit() {
  
  this.localArtists = await this.musicService.getArtists();
  this.loadAlbums(); 
  this.loadTracks();
  await this.loadStorageData();

  this.presentingElement = this.ionRouterOutlet.nativeEl;

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

  getLocalArtists() {
  // los artistas del servicio
  const res = this.musicService.getLocalArtists();
  this.localArtists = res.artists as Artist[];
  
  console.log("Artistas cargados con sus imágenes del JSON:", this.localArtists);

  }


  async showSongs(album: any) {
  // 1. Obtener las canciones
  const songs = await this.musicService.getSongsByAlbum(album.id);

  const modal = await this.modalCtrl.create({
    component: SongsModalPage,
    componentProps: {
      songs: songs,
      title: album.name,
      image: album.image
    }
  });

  // 2. RECIBIR LA CANCIÓN:sobreescribir 'this.song' con la elegida
  modal.onDidDismiss().then((result) => {
    if (result.data) {
      this.song = result.data; // Aquí 'song' ya tiene los datos reales de la API
      console.log("Canción seleccionada:", this.song);
    }
  });

  return await modal.present();
}
  

handleClick(artist: any) {
  console.log("Artista seleccionado:", artist);
  this.showSongsByArtist(artist);
}

onSwiper(event: any) {
  console.log("Swiper event: ", event);
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
      artist: artist 
    }
  }); 
  return await modal.present();
}


}


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