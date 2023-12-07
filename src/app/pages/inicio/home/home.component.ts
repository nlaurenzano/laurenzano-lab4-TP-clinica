import { Component } from '@angular/core';

import { AuthenticationService } from "../../../servicios/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor( public authenticationService: AuthenticationService ) {}

}
