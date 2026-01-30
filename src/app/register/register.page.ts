import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {

    
   this.registerForm = this.fb.group({

    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ ]+$')
      ]
    ],

    lastname: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ ]+$')
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]

  });

  }

  async register() {

    if (this.registerForm.invalid) {
      this.showToast('Formulario inválido');
      return;
    }

    try {
      // Llama al servicio que registra al usuario
      await this.registerService.registerUser(this.registerForm.value);

      // Muestra el mensaje de éxito
      this.showToast('Registro exitoso');

      // Navega a la página de login
      this.router.navigateByUrl('/login');
    } catch (error: any) {
      // Muestra el error si algo falla
      this.showToast(error);
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  async showToast(message: string) {

    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success' 
    });

    await toast.present();

  }

}
