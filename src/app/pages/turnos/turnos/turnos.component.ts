import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from "../../../servicios/authentication.service";
import { DbService } from "../../../servicios/db.service";

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  public turnos;

  constructor( 
    public authenticationService: AuthenticationService,
    public db: DbService ) {}

  ngOnInit() {
    this.mostrarTodos();
  }

  // Devuelve la lista de todos los turnos del usuario
  mostrarTodos() {
    const usuario = this.authenticationService.usuario;
    this.turnos = this.db.obtenerTurnosUsuario( usuario );
  }

  // Genera la lista de todos los turnos disponibles
  async generarTurnos() {
    let turnosResult = [];

    // TODO: Con esta lista se van a filtrar los turnos propuestos
    const turnosExistentes = await this.db.obtenerTurnos();

    const horaInicio: number = 9;
    const horaFin: number = 19;
    const duracion: number = 0.5;

    const d = new Date();
    let fecha: string = d.toLocaleString("es-CL");

    for ( let hora = horaInicio; hora < horaFin; hora+=duracion ) {
      turnosResult.push({
        dia: fecha,
        hora: hora,
        // especialista: '',
        // especialidad: '',
        paciente: this.authenticationService.usuario.email,
        // estado: '',
      });
    }


    return turnosResult;
  }










}
