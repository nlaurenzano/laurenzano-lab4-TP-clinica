import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'turno-filtro',
  templateUrl: './turno-filtro.component.html',
  styleUrls: ['./turno-filtro.component.css']
})
export class TurnoFiltroComponent {

  @Output() seleccionado = new EventEmitter<string>();


  public turno = {
    horario: '',
    estado: '',
    historia: {
      altura: '',
      peso: '',
      temperatura: '',
      presion: '',
      datosDinamicos: [
        {clave: '', valor: ''},
        {clave: '', valor: ''},
        {clave: '', valor: ''},
        {clave: '', valor: ''},
        {clave: '', valor: ''},
        {clave: '', valor: ''}
      ]
     }
   };

  seleccionar( item ) {
    this.seleccionado.emit(item);
  }

}
