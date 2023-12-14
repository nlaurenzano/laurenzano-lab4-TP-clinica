import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { DirectivasModule } from '../../directivas/directivas.module';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { InformesComponent } from './informes/informes.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    InformesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    DirectivasModule
  ]
})
export class AdminModule { }
