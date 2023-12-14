import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivasRoutingModule } from './directivas-routing.module';
import { ResaltarListaDirective } from './resaltar-lista.directive';
import { ResaltarTurnoDirective } from './resaltar-turno.directive';

@NgModule({
  declarations: [
    ResaltarListaDirective,
    ResaltarTurnoDirective
  ],
  imports: [
    CommonModule,
    DirectivasRoutingModule
  ],
  exports: [
    ResaltarListaDirective,
    ResaltarTurnoDirective
  ],
})
export class DirectivasModule { }
