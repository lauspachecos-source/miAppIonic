import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../services/storage';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule]
})
export class MenuPage implements OnInit {

  constructor(private storageService: StorageService, private router: Router,
    private menu: MenuController
  ) { }
  
  logout() {
  this.storageService.set('isLogged', false);
  this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }

  goToIntro(){
    this.router.navigate(['/intro']);
  }

  goToProfile() {
  this.router.navigate(['/profile']);
  }

  goToSettings() {
  // Este método navegaría a una página de ajustes en el futuro
  console.log("Ir a Ajustes");
  }
  
  closeMenu() {
  this.menu.close();
}
}
