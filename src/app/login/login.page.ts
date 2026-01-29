import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule, FormBuilder, FormGroup, Validator, Validators, FormControl } from '@angular/forms';
import { IonicModule, ToastController, NavController  } from '@ionic/angular';
import { AuthService } from '../services/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
 //crear un nuevo guard para cuando intente entrar al home validar si estoy logueada, si lo otro es true
 //sino redireccionar al login 

export class LoginPage implements OnInit {

    loginForm: FormGroup;

    errorMessage: string = "";

    
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
  constructor( private formBuilder: FormBuilder, private NavCtrl: NavController, 
  private toastController: ToastController, private authService: AuthService) { 
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

  this.authService.loginUser(credentials)
    .then(async res => {
      // Login correcto
      this.errorMessage = "";
      
      console.log('LOGIN CORRECTO → redirigiendo a INTRO');
      console.log('isLogged ya fue guardado en storage');

      const toast = await this.toastController.create({
        message: String(res), // login correcto
        duration: 2000,
        position: 'bottom',
        color: 'success'
      }); 
      await toast.present();

      // luego del login correcto
      this.NavCtrl.navigateRoot('/intro');
    })
    .catch(async error => {
      this.errorMessage = error;

      const toast = await this.toastController.create({
        message: error, // login incorrecto
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      await toast.present();
    });
  }
}