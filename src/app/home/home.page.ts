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
export class HomePage implements OnInit{
  colorClaro =  'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorOscuro;
  introVisited = false;


   /* temaActual: 'claro' | 'oscuro' = 'claro';

  cambiarTema() {
    const root = document.documentElement;
    const tema = this.temaActual === 'claro' ? 'oscuro' : 'claro';

    root.style.setProperty('--color-fondo-tarjeta', `var(--tema-${tema}-fondo)`);
    root.style.setProperty('--color-texto-tarjeta', `var(--tema-${tema}-texto)`);
    root.style.setProperty('--color-slide-title', `var(--tema-${tema}-titulo)`);

    this.temaActual = tema;
  }*/


  genres = [
    {
      title: "Música clásica",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLGpLWtd6BNbPf05_NmHIvElV1GSJosYIwiw&s",
      description: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuandoS un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con lSa creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
    }, 
    {
      title: "Rock",
      image: "https://www.billboard.com/wp-content/uploads/2025/02/021025-Rock-Love-Songs-Staff-Picks-billboard-1548.jpg?w=942&h=628&crop=1",
      description: "El rock es un amplio género de música popular originado a principios de la década de 1950 en Estados Unidos y que derivó en un gran rango de diferentes estilos a mediados de los años 1960 y posteriores, particularmente en ese país y Reino Unido.Tiene sus raíces en el rock and roll de los años 50, estilo surgido directamente de géneros como el blues, el rhythm and blues (pertenecientes a la música afroamericana) y el country. "
    },
    {                        
      title: "Jazz",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXqL5qthMzUhxj8OXgxtB5JyqvYFnwKsakOw&s",
      description: "El jazz es un género musical estadounidense nacido a finales del siglo XIX en las comunidades afroamericanas de Nueva Orleans,Luisiana, que se expandió de manera mundial a lo largo del siglo XX. La identidad musical del jazz es compleja. Aunque a menudo el término se use para hacer referencia a un idioma musical (tal como se hace, por ejemplo, cuando se habla de música clásica), el jazz es en realidad una familia de géneros musicales que comparten características comunes, pero no representan individualmente la complejidad de género como un todo."
    }
  ];

  constructor(private storageService: StorageService, private router: Router) { 
  }

 
  async ngOnInit(){
    await this.loadStorageData();
  }

  async ionViewWillEnter() {
  const visited = await this.storageService.get('introVisited');
  console.log('VALOR EN STORAGE:', visited);
  this.introVisited = !!visited;

   await this.simularCargarDatos();
}

goToIntro() {
  this.router.navigateByUrl('/intro');
}

  async cambiarColor(){

  //if ternario
    this.colorActual = this.colorActual === this.colorOscuro ?   this.colorClaro : this.colorOscuro;

    await this.storageService.set('theme', this.colorActual)
    console.log('tema guardado: ', this.colorActual )
   
  }
  
  async loadStorageData() {
    const savedTheme = await this.storageService.get('theme');
    if(savedTheme) {
      this.colorActual = savedTheme;
    }
  }

   

  async simularCargarDatos(){
    const data = await this.obtenerDatosSimulados();
    console.log('datos Simulados: ', data);
  }
 
  obtenerDatosSimulados(){
    return new Promise((resolve) =>{
      setTimeout(()=> {
        resolve(['Rock','Pop', 'Jazz']) 
      },3500)
    })
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