import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErroresRoutingModule } from './errores-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { VerificarComponent } from './verificar/verificar.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    VerificarComponent
  ],
  imports: [
    CommonModule,
    ErroresRoutingModule
  ]
})
export class ErroresModule { }
