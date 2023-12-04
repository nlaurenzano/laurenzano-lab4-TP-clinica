import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from "../../../servicios/authentication.service";
import { DbService } from "../../../servicios/db.service";

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  usuario = this.authenticationService.usuario;
  public filtro: boolean = false;
  public turnos;
  public turnoSeleccionado = null;


  constructor( 
    public authenticationService: AuthenticationService,
    public db: DbService ) {}

  ngOnInit() {
    this.mostrarTodos();
  }

  // Devuelve la lista de todos los turnos del usuario
  mostrarTodos() {

    switch (this.usuario.rol) {
      case 'paciente':
        this.turnos = this.db.obtenerTurnosPaciente( this.usuario );
      break;

      case 'especialista':
        this.turnos = this.db.obtenerTurnosEspecialista( this.usuario );
      break;

      default:
        // admin
        this.turnos = this.db.obtenerTurnos();
      break;
    }
  }

  get esAdmin() {
    return this.usuario.rol == 'administrador';
  }

  seleccionarTurno( turno ) {
    this.turnoSeleccionado = turno;
  }

  filtrar() {
    this.filtro = true;
  }








}
