import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Pipe({
  name: 'traducirBoolean'
})
export class TraducirBooleanPipe implements PipeTransform {

  constructor( private title: TitleCasePipe ) {}

  transform(value: unknown, ...args: unknown[]): unknown {

    if ( value == null ) {
      return '';
    } else {
      switch (typeof value) {
        case 'boolean':
          if ( value ) {
            return "Sí";
          } else {
            return "No";
          }
          break;

        case 'string':
          return this.title.transform(value);
          break;

        default:
          return value;
          break;
      }
    }
  }

}
