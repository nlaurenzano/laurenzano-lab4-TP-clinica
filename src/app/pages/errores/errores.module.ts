import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErroresRoutingModule } from './errores-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    ErroresRoutingModule
  ]
})
export class ErroresModule { }
