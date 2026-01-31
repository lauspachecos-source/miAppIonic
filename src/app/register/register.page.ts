import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, IonicModule } from '@ionic/angular';
import { RegisterService } from '../services/register';  // Asegúrate de importar el servicio

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,  // Asegúrate de importar IonicModule aquí
    FormsModule,  // Importa FormsModule si estás usando formularios reactivos
    ReactiveFormsModule  // Asegúrate de tener ReactiveFormsModule para los formularios reactivos
  ]

})

export class RegisterPage implements OnInit {

  registerForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,  // Inyección del servicio
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    if (this.registerForm.invalid) {
      this.showToast('Formulario inválido');
      return;
    }

    try {
      // Llamamos al servicio para registrar el usuario
      await this.registerService.registerUser(this.registerForm.value);
      this.showToast('Registro exitoso');
      this.router.navigateByUrl('/login');  // Redirige al login después de registrar
    } catch (error: any) {
      // Si algo falla (correo duplicado, por ejemplo), muestra el error
      this.showToast(error.message);
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  // Muestra un mensaje Toast para el usuario
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }
}
