import { Component, OnInit } from '@angular/core';


import { AuthenticationService } from "../../../servicios/authentication.service";
import { DbService } from "../../../servicios/db.service";

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  public turnosDisponibles;

  constructor( 
    public authenticationService: AuthenticationService,
    public db: DbService ) {}

  ngOnInit() {
    this.mostrarTodos();
  }

  // TODO: Esto está armado para probar
  // Muestra los turnos generados
  mostrarTodos() {
    const usuario = this.authenticationService.usuario;
    this.turnosDisponibles = this.generarTurnos();
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
