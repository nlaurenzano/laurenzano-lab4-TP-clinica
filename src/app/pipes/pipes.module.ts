import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleCasePipe } from '@angular/common';

import { PipesRoutingModule } from './pipes-routing.module';
import { NombreUsuarioPipe } from './nombre-usuario.pipe';
import { TraducirBooleanPipe } from './traducir-boolean.pipe';

@NgModule({
  declarations: [
    NombreUsuarioPipe,
    TraducirBooleanPipe
  ],
  imports: [
    CommonModule,
    PipesRoutingModule
  ],
  exports: [
    NombreUsuarioPipe,
    TraducirBooleanPipe
  ],
  providers: [
    TitleCasePipe
  ]
})
export class PipesModule { }