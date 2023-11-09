import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Usuario } from "../../../servicios/authentication.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor( public authenticationService: AuthenticationService ) {}

  ngOnInit() {
    this.authenticationService.obtenerUsuarios();
  }


}
