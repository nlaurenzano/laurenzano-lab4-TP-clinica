import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TurnosRoutingModule } from './turnos-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivasModule } from '../../directivas/directivas.module';

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
    FormsModule,
    ComponentsModule,
    PipesModule,
    DirectivasModule
  ]
})
export class TurnosModule { }
