import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Usuario } from "../../../servicios/authentication.service";
import { DbService } from "../../../servicios/db.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios;
  public usuarioDetalle: Usuario = null;

  constructor( public db: DbService ) {}

  ngOnInit() {
    this.usuarios = this.db.obtenerUsuarios();
  }

  mostrarDetalle( usuario ) {

    this.usuarioDetalle = usuario;

  }


}
