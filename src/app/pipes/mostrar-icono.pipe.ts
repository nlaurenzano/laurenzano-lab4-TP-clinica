import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarIcono'
})
export class MostrarIconoPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    if ( value == null || value.rol == null || value.rol == '' ) {
      return '';
    } else {
      let icono = '';
      switch(value.rol) {
        case 'administrador':
          icono = 'fa-solid fa-screwdriver-wrench';
          break;
        case 'especialista':
          icono = 'fas fa-stethoscope';
          break;
        case 'paciente':
          icono = 'fa-solid fa-hospital-user';
          break;
        default:
          // nada
      } 
      return icono;
    }    
  }

}
