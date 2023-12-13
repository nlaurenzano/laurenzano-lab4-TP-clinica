import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traducirBoolean'
})
export class TraducirBooleanPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    if ( value == null || value == '' ) {
      return '';
    } else if ( value == true ) {
      return "sí";
    } else {
      return "no";
    }
  }

}
