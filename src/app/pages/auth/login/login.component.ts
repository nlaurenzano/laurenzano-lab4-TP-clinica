import { Component } from '@angular/core';
import { AuthenticationService } from "../../../servicios/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  fillEmail: string = '';
  fillClave: string = '';

  public usuarios = ['admin1','admin1','admin1','admin1','admin1','admin1'];

  constructor( public authenticationService: AuthenticationService ) { }

  completarCampos( id: number ) {
    // this.fillEmail = this.usuarios[id];
    this.fillEmail = 'admin1@clinica.com';
    this.fillClave = "password";
  }

}
