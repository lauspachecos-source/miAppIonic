import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage';

interface Card {
  title: string;
  text: string;
  image?: string;
}

interface Slide {
  title: string;
  description: string;
  image?: string;
  cards?: Card[];
}

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage implements OnInit {

  slides: Slide[] = [
    {
      title: 'Bienvenido 🎵',
      description: 'Explora géneros musicales y descubre nuevos sonidos',
      image: 'https://external-preview.redd.it/Jhokc1NbRBmdjay9lpbVIAaqoLjGK8XDL7XLxZ55OQQ.jpg?auto=webp&s=f70f3e3a2b5475047a6601d4e494b73ff931ab2e',
      cards: []
    },
    {
      title: 'Rock',
      description: 'The Beatles: Fueron la primera banda en dar un concierto en un estadio. ¿Te imaginas?',
      image: 'https://cdn.artphotolimited.com/images/605869babd40b85858add246/300x300/taylor-hawkins-foo-fighters-2018.jpg',
      cards: []
    },
    {
      title: 'Pop',
      description: '¿Te enteraste de cuál es el álbum más vendido del siglo XXI? ¡Sí! 21 de Adele',
      image: 'https://citas.in/media/authors/adele-singer.jpeg',
      cards: []
    },
    {
      title: 'Jazz',
      description: '¿Sabías que el Jazz nació en Nueva Orleans en 1895, en el estado de Luisiana? Desde entonces se convirtió en un símbolo de improvisación y libertad musical.',
      image: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-96410678.jpg?crop=0.5625290562529056xw:1xh;center,top&resize=640:*',
      cards: []
    },
    {
      title: 'EDM',
      description: 'Ritmos inmersivos y beats que envuelven la ciudad. Sumérgete en nuevos sonidos que te harán vibrar.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfzSh6TIlrO1XKOpF6yQSNxvH87FGykY_Ojw&s',
      cards: []
    }
  ];

  colorActual: 'light' | 'dark' = 'light';

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {}

  toggleTheme() {
    this.colorActual = this.colorActual === 'light' ? 'dark' : 'light';
  }

  async goBack() {
    // Guardar que ya vio la intro
    await this.storageService.set('introVisited', true);

    // Redirigir a Home
    this.router.navigateByUrl('/menu/home', { replaceUrl: true });
  }

 goToIntroAgain() {
  this.router.navigateByUrl('/intro', { replaceUrl: true });
  }

  async goToIntro() {
    // Reset storage para permitir ver intro nuevamente
    await this.storageService.set('introVisited', false);

    // Redirigir a Intro
    this.router.navigateByUrl('/intro', { replaceUrl: true });
  }
}


/*

import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage';


interface Card {
  title: string;
  text: string;
  image?: string;
}

interface Slide {
  title: string;
  description: string;
  image?: string;
  cards?: Card[];
}


@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class IntroPage implements OnInit {

  constructor(
    private router: Router,
    private storageService: StorageService,

  ) {}

  ngOnInit() {}


   slides: Slide[] = [
    {
      title: 'Bienvenido 🎵',
      description: 'Explora géneros musicales y descubre nuevos sonidos',
      image: 'https://external-preview.redd.it/Jhokc1NbRBmdjay9lpbVIAaqoLjGK8XDL7XLxZ55OQQ.jpg?auto=webp&s=f70f3e3a2b5475047a6601d4e494b73ff931ab2e',
      cards: []
    },
    {
      title: 'Rock',
      description: 'The Beatles: Fueron la primera banda en dar un concierto en un estadio. ¿Te imaginas?',
      image: 'https://cdn.artphotolimited.com/images/605869babd40b85858add246/300x300/taylor-hawkins-foo-fighters-2018.jpg',
      cards: []
    },
    {
      title: 'Pop',
      description: '¿Te enteraste de cuál es el álbum más vendido del siglo XXI? ¡Sí! 21 de Adele',
      image: 'https://citas.in/media/authors/adele-singer.jpeg',
      cards: []
    },
    {
      title: 'Jazz',
      description: '¿Sabías que el Jazz nació en Nueva Orleans en 1895, en el estado de Luisiana? Desde entonces se convirtió en un símbolo de improvisación y libertad musical.',
      image: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-96410678.jpg?crop=0.5625290562529056xw:1xh;center,top&resize=640:*',
      cards: []
    },
    {
      title: 'EDM',
      description: 'Ritmos inmersivos y beats que envuelven la ciudad. Sumérgete en nuevos sonidos que te harán vibrar.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfzSh6TIlrO1XKOpF6yQSNxvH87FGykY_Ojw&s',
      cards: []
    }
  ];
   colorActual!: 'light' | 'dark';

   toggleTheme() {
    this.colorActual = this.colorActual === 'light' ? 'dark' : 'light';
  }

  
  async goBack() {
    // guardar que ya estuve en intro
    await this.storageService.set('introVisited', true);

    // volver al home 
    this.router.navigateByUrl('/menu/home', { replaceUrl: true });
    //evita volver a intro con el botón atrás

    // GUARDA QUE VISITE INTRO
       if (this.storageService.delete) {
    await this.storageService.delete('introVisto'); //  marca que no lo vio
  }
  // Redirige al Home
  this.router.navigate(['/home']);
  }

}
 

//al vover atras o al volver al home guardar en el storage que la vi la pagina intro
*/