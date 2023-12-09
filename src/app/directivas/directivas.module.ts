import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivasRoutingModule } from './directivas-routing.module';
import { ResaltarListaDirective } from './resaltar-lista.directive';

@NgModule({
  declarations: [
    ResaltarListaDirective
  ],
  imports: [
    CommonModule,
    DirectivasRoutingModule
  ],
  exports: [
    ResaltarListaDirective
  ],
})
export class DirectivasModule { }
