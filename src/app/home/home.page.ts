import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  // Tema 
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorOscuro;

  //Estado 
  introVisited = false;

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

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  //Ciclo de vida 
  async ngOnInit() {
    await this.loadStorageData();
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