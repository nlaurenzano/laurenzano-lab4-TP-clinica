import { Component, Input } from '@angular/core';

import { AuthenticationService } from "../../servicios/authentication.service";
import { DbService } from "../../servicios/db.service";

@Component({
  selector: 'app-turno-detalle',
  templateUrl: './turno-detalle.component.html',
  styleUrls: ['./turno-detalle.component.css']
})
export class TurnoDetalleComponent {

  @Input() datos;

  private roles = ['administrador', 'especialista', 'paciente'];
  private accion: string = '';
  public info = {comentario:'', calificacion:'', encuesta:''};

  constructor( public authenticationService: AuthenticationService, public db: DbService ) {}

  set setAccion( valor ) {
    this.accion = valor;
  }

  get getAccion() {
    return this.accion;
  }

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
    if ((this.esEspecialista || this.esAdmin) && 
        this.datos.estado != 'aceptado' && this.datos.estado != 'finalizado' && this.datos.estado != 'rechazado' && this.datos.estado != 'cancelado') {
      return true;
    }

    if (this.esPaciente && this.datos.estado != 'cancelado' && this.datos.estado != 'finalizado' ) {
      return true;
    }
    
    return false;
  }

  get esRechazable() {
    if (this.esEspecialista && 
        this.datos.estado != 'aceptado' && this.datos.estado != 'finalizado' && this.datos.estado != 'cancelado' && this.datos.estado != 'rechazado') {
      return true;
    }
    return false;
  }

  get esAceptable() {
    if (this.esEspecialista && 
        this.datos.estado != 'rechazado' && this.datos.estado != 'finalizado' && this.datos.estado != 'cancelado' && this.datos.estado != 'aceptado') {
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
    if (this.esPaciente && this.datos.estado == 'finalizado' && this.datos.resena != '') {
      return true;
    }
    return false;
  }

  // Solamente debe ser visible una vez que el turno sea realizado.
  get esCalificable() {
    if (this.esPaciente && this.datos.estado == 'finalizado') {
      return true;
    }
    return false;
  }
  
  get calificacionDisplay() {
    let resultado = [];
    let datos = this.datos;
    if (datos.calificacion != '') {

      for ( let i=0; i<datos.calificacion; i++) {
        resultado.push(1);
      }
    }
    return resultado;
  }


  aceptarTurno() {
    this.datos.estado = 'aceptado';
    this.db.actualizarTurno(this.datos, this.info);
  }

  confirmarAccion() {
    switch (this.accion) {
      case 'cancelar':
        this.datos.estado = 'cancelado';
        break;
      case 'finalizar':
        this.datos.estado = 'finalizado';
        break;
      case 'rechazar':
        this.datos.estado = 'rechazado';
        break;
    }
    this.db.actualizarTurno(this.datos, this.info);
    this.resetearInfo();
  }

  resetearInfo() {
    this.info.comentario = '';
    this.info.calificacion = '';
    this.info.encuesta = '';
  }



}
