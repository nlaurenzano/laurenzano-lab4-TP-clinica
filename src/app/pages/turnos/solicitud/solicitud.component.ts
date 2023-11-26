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
  public turnoSeleccionado = null;

// TODO: Eliminar harcodeo
  public especialistaSeleccion = '8tk9r5ua@cj.MintEmail.com';
  public especialidadSeleccion = 'traumatología';
  private duracion: number = 30;  // En minutos

  private estados = ['asignado'];
  private turnosExistentes = null;

  constructor( 
    public authenticationService: AuthenticationService,
    public db: DbService ) {}

  ngOnInit() {
    this.mostrarTurnos();
  }

  // Muestra los turnos generados
  mostrarTurnos() {
    const usuario = this.authenticationService.usuario;


    // TODO: Obtener disponibilidad del especialista y duración de los turnos


    this.db.obtenerTurnosExistentes( usuario.email, this.especialistaSeleccion, this.especialidadSeleccion )
      .then((turnosExistentes) => {
        this.turnosExistentes = turnosExistentes;
        this.turnosDisponibles = this.generarTurnos();
      });

  }

  // Genera la lista de todos los turnos disponibles
  async generarTurnos() {
    let turnosResult = [];

    const horaInicio: number = 9;
    const horaFin: number = 19;
    const duracionHoras: number = this.duracion / 60;  // En horas
    const horario = new Date();
    horario.setHours(horaInicio, 0, 0);

    for ( let hora = horaInicio; hora < horaFin; hora+=duracionHoras ) {

      if ( this.turnoDisponible( horario ) ) {
        turnosResult.push({
          horario: new Date(horario.toString()),
          especialista: this.especialistaSeleccion,
          especialidad: this.especialidadSeleccion,
          paciente: this.authenticationService.usuario.email
        });
      }

      horario.setMinutes(horario.getMinutes() + this.duracion); 
    }
    return turnosResult;
  }

  async confirmarTurno() {
    this.turnoSeleccionado.estado = this.estados[0];
    await this.db.crearTurno( this.turnoSeleccionado );
    this.mostrarTurnos();
  }

  set setTurno( turno ) {
    this.turnoSeleccionado = turno;
  }


  turnoDisponible( horario ): boolean {
    let resultado = true;
    const duracion = this.duracion;

    if ( this.turnosExistentes.length > 0 ) {
      let turnoFin = new Date(horario.toString());
      turnoFin.setMinutes(turnoFin.getMinutes() + duracion); 

      this.turnosExistentes.forEach( function(turnoExistente) {
        let existenteFin = new Date(turnoExistente.horario.toString());
        existenteFin.setMinutes(existenteFin.getMinutes() + duracion); 

        // Valido que el turno propuesto no se superpone con alguno existente
        if ( horario < existenteFin && turnoFin > turnoExistente.horario ) {
          resultado = false;
        }
      });
    }
    return resultado;
  }



}
