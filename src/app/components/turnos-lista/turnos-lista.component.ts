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

  ngOnInit() {
    // this.listaPorDias();
    // this.lista = this.listaPorDias();
  }

  set setTurno( turno ) {
    this.turnoSeleccionado = turno;
  }

  seleccionar() {
    this.seleccionado.emit(this.turnoSeleccionado);
  }

  // Devuelve un array que contiene un array por cada día, con los turnos para ese día.
  listaPorDias() {

    if ( this.lista.length != 0 ) {

      this.lista.then((turnos) => {
        let indexDia = 0;

        turnos.forEach((item, index, arr) => {
          if ( index == 0 || arr[index-1].horario.getDate() != item.horario.getDate() ) {
            // Agrego array para un nuevo día, con el primer turno
            this.turnos.push( [item] );
            
            // Incremento el índice principal
            indexDia = index == 0 ? 0 : indexDia+1;

          } else {
            // Agrego turno al array del día
            this.turnos[indexDia].push( item );
          }

        });
      });
      // return listaDias;
    }
  }

  get esSolicitud() {
    return this.tipo == 'solicitud';
  }

  get esListado() {
    return this.tipo == 'listado';
  }


}
