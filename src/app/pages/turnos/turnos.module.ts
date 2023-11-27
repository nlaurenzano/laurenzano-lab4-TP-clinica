import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { TurnosComponent } from './turnos/turnos.component';
import { SolicitudComponent } from './solicitud/solicitud.component';

@NgModule({
  declarations: [
    TurnosComponent,
    SolicitudComponent
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    ComponentsModule
  ]
})
export class TurnosModule { }
