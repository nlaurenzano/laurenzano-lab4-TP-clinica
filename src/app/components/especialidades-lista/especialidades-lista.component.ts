import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'especialidades-lista',
  templateUrl: './especialidades-lista.component.html',
  styleUrls: ['./especialidades-lista.component.css']
})
export class EspecialidadesListaComponent {

  @Input() lista;
  @Output() seleccionado = new EventEmitter<string>();
  
  seleccionar( item ) {
    this.seleccionado.emit(item);
  }

}
