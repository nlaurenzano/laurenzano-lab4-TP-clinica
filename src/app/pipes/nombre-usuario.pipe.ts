import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Pipe({
  name: 'nombreUsuario'
})
export class NombreUsuarioPipe implements PipeTransform {

  constructor( private title: TitleCasePipe ) {}

  transform(value: any, ...args: unknown[]): string {
    if ( value == null || value.nombre == null || value.apellido == null || (value.nombre == '' && value.apellido == '') ) {
      return '';
    } else {
      return this.title.transform(value.nombre + ' ' + value.apellido);
    }    
  }

}
