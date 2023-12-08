import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleCasePipe } from '@angular/common';

import { PipesRoutingModule } from './pipes-routing.module';
import { NombreUsuarioPipe } from './nombre-usuario.pipe';

@NgModule({
  declarations: [
    NombreUsuarioPipe
  ],
  imports: [
    CommonModule,
    PipesRoutingModule
  ],
  exports: [
    NombreUsuarioPipe
  ],
  providers: [
    TitleCasePipe
  ]
})
export class PipesModule { }
