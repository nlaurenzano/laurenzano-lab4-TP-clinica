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

  private usuarios = ['test2@test.com','test3@lab4.com','test5@lab4.com'];

  constructor( public authenticationService: AuthenticationService ) { }

  completarCampos( id: number ) {
    this.fillEmail = this.usuarios[id];
    this.fillClave = "password";
  }

}
