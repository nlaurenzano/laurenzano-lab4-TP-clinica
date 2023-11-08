import { Component } from '@angular/core';
import { AuthenticationService } from "../../../servicios/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor( public authenticationService: AuthenticationService ) { }

  // public signUp() {
  //   this.;
  // }

}
