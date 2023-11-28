import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { TurnosComponent } from './turnos/turnos.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { HorariosComponent } from './horarios/horarios.component';

@NgModule({
  declarations: [
    TurnosComponent,
    SolicitudComponent,
    HorariosComponent
  ],
  exports: [
    HorariosComponent
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    ComponentsModule
  ]
})
export class TurnosModule { }
