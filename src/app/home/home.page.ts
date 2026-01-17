import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

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
export class HomePage {
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

  constructor() {}
}


//tarea: agregar 3 slides con info de generos de musica 