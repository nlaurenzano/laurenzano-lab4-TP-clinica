import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Usuario } from "../../../servicios/authentication.service";
import { DbService } from "../../../servicios/db.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor( public db: DbService ) {}

  ngOnInit() {
    this.db.obtenerUsuarios();
  }


}
