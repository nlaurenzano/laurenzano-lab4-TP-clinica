import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ComponentsModule } from '../../components/components.module';
import { TurnosModule } from '../turnos/turnos.module';

@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    ComponentsModule,
    TurnosModule
  ]
})
export class InicioModule { }
