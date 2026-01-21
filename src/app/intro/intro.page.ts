import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IntroPage implements OnInit {

  constructor(private router: Router, private storageService: StorageService ) { 

  }

  ngOnInit() {
  }

  async goBack(){

    // guardar que ya estuve en intro
    await this.storageService.set('introVisited', true);
    //console.log("Volver")


    // volver al home 
    this.router.navigateByUrl("/home");

    //al vover atras o al volver al home guardar en el storage que la vi la pagina intro
  }
  
  goToIntro() {
  this.router.navigateByUrl('/intro');
}

}
