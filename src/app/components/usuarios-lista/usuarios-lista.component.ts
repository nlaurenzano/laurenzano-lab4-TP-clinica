import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ArchivosService } from "../../servicios/archivos.service";

@Component({
  selector: 'usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent {

  @Input() lista;
  @Input() conHabilitacion: boolean = false;
  @Input() orientacion: string = 'vertical';
  @Output() seleccionado = new EventEmitter<string>();
  @Output() toggleHabilitacion = new EventEmitter<string>();

  private roles = ['administrador', 'especialista', 'paciente'];

  constructor( public archivos: ArchivosService ) {}

  mostrarIcono( usuario ): string {
    let icono = '';
    switch(usuario.rol) {
      case this.roles[0]:
        icono = 'fa-solid fa-screwdriver-wrench';
        break;
      case this.roles[1]:
        icono = 'fas fa-stethoscope';
        break;
      case this.roles[2]:
        icono = 'fa-solid fa-hospital-user';
        break;
      default:
        // nada
    } 
    return icono;
  }

  seleccionar( usuario ) {
    this.seleccionado.emit(usuario);
  }

  toggleHabilitar( usuario ) {
    this.toggleHabilitacion.emit(usuario);
  }

  get habilitacion(): boolean {
    return this.conHabilitacion;
  }

  get orientacionVertical(): boolean {
    return this.orientacion == 'vertical';
  }

  get orientacionHorizontal(): boolean {
    return this.orientacion == 'horizontal';
  }

}
