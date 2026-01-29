import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule, FormBuilder, FormGroup, Validator, Validators, FormControl } from '@angular/forms';
import { IonicModule, ToastController  } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;
    // tarea 5: añadir los validation_message para password, asi con lo hicimos con email, para pasword
      validation_messages = {
        email: [
        {
          type: 'required',
          message: 'El email es obligatorio'
        },
        {
          type: 'email',
          message: 'Email inválido'
        }
      ],
    password: [
        {
          type: 'required',
          message: 'La contraseña es obligatoria'
        },
        {
          type: 'minlength',
          message: 'La contraseña debe tener al menos 6 caracteres'
        }
      ]
    }
  constructor( private formBuilder: FormBuilder, 
  private toastController: ToastController) { 
    this.loginForm = this.formBuilder.group({
        email: new FormControl(
        '',
          Validators.compose([
            Validators.required, //Campo obligatorio
            Validators.email, //valida el correo electronico
            Validators.minLength(6)// si ingreso en el campo de pass, debe tener 6 char min
          ])
      ),
        password: new FormControl(
        '',
            Validators.compose([
              Validators.required, //campo obligatorio 
              Validators.minLength(6)
            ])
      )
    })
  }

  ngOnInit() {
  }
  async loginUser(credentials: any) {
    console.log('Email:', credentials.email);
    console.log('Password:', credentials.password);

    const toast = await this.toastController.create({
    message: 'Login enviado correctamente',
    duration: 2000,
    position: 'bottom',
    color: 'success'
    });
    await toast.present();
  }
}
