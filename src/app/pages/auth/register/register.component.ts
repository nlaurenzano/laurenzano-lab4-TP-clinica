import { Component } from '@angular/core';
import { AuthenticationService, Usuario } from "../../../servicios/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public usuario: Usuario = {
    rol: '',
    nombre: '',
    apellido: '',
    edad: '',
    dni: '',
    email: '',
    clave: '',
    obraSocial: '',
    especialidad: ''
};

  constructor( public authenticationService: AuthenticationService ) { }

  public signUp() {
    this.authenticationService.signUp(this.usuario);
  }

}
