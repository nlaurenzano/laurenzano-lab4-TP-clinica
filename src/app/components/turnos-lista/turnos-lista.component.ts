import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'turnos-lista',
  templateUrl: './turnos-lista.component.html',
  styleUrls: ['./turnos-lista.component.css']
})
export class TurnosListaComponent implements OnInit {

  @Input() lista;
  @Input() tipo;
  @Output() seleccionado = new EventEmitter<string>();

  public turnos= [];
  public turnoSeleccionado = null;

  ngOnInit() {}

  set setTurno( turno ) {
    this.turnoSeleccionado = turno;
  }

  seleccionar() {
    this.seleccionado.emit(this.turnoSeleccionado);
  }

  seleccionarTurno( turno ) {
    this.seleccionado.emit(turno);
  }

  get esSolicitud() {
    return this.tipo == 'solicitud';
  }

  get esListado() {
    return this.tipo == 'listado';
  }

  get esHistoria() {
    return this.tipo == 'historia';
  }

  descargar() {
    // TODO: Descarga de turnoSeleccionado en PDF

  }


}
