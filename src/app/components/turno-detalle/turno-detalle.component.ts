import { Component, Input } from '@angular/core';

import { AuthenticationService } from "../../servicios/authentication.service";

@Component({
  selector: 'app-turno-detalle',
  templateUrl: './turno-detalle.component.html',
  styleUrls: ['./turno-detalle.component.css']
})
export class TurnoDetalleComponent {

  @Input() datos;

  private roles = ['administrador', 'especialista', 'paciente'];

    constructor( public authenticationService: AuthenticationService ) {}

  get esAdmin(): boolean {
    return this.authenticationService.usuario.rol == this.roles[0];
  }

  get esEspecialista(): boolean {
    return this.authenticationService.usuario.rol == this.roles[1];
  }

  get esPaciente(): boolean {
    return this.authenticationService.usuario.rol == this.roles[2];
  }

  // Solamente debe ser visible si el turno NO fue Aceptado, Realizado o Rechazado
  get esCancelable() {

    // TODO: Ver si considero que el horario haya pasado
    if (this.esEspecialista && 
        this.datos.estado != 'aceptado' && this.datos.estado != 'finalizado' && this.datos.estado != 'rechazado') {
      return true;
    }

    // if (this.esPaciente && this.datos.estado != 'finalizado' ) {
    if (this.esPaciente ) {
      return true;
    }
    
    return false;
  }

  get esRechazable() {
    if (this.esEspecialista && 
        this.datos.estado != 'aceptado' && this.datos.estado != 'finalizado' && this.datos.estado != 'cancelado') {
      return true;
    }
    return false;
  }

  get esAceptable() {
    if (this.esEspecialista && 
        this.datos.estado != 'rechazado' && this.datos.estado != 'finalizado' && this.datos.estado != 'cancelado') {
      return true;
    }
    return false;
  }

  get esFinalizable() {
    if (this.esEspecialista && this.datos.estado == 'aceptado' ) {
      return true;
    }
    return false;
  }

  // Solamente debe estar visible si el especialista marcó el turno como realizado y dejo la reseña.
  get esEncuestable() {
    if (this.datos.estado == 'finalizado' && this.datos.resena != '') {
      return true;
    }
    return false;
  }

  // Solamente debe ser visible una vez que el turno sea realizado.
  get esCalificable() {
    if (this.datos.estado == 'finalizado') {
      return true;
    }
    return false;
  }

  cancelarTurno() {

  }

  rechazarTurno() {

  }

  aceptarTurno() {

  }

  finalizarTurno() {

  }


  completarEncuesta() {

  }

  calificarAtencion() {

  }


}
