import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'turnos-lista',
  templateUrl: './turnos-lista.component.html',
  styleUrls: ['./turnos-lista.component.css']
})
export class TurnosListaComponent {

  @Input() lista;
  @Output() seleccionado = new EventEmitter<string>();

  public turnoSeleccionado = null;

  set setTurno( turno ) {
    this.turnoSeleccionado = turno;
  }

  seleccionar() {
    this.seleccionado.emit(this.turnoSeleccionado);
  }

}
