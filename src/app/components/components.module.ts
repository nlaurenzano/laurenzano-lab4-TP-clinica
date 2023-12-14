import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';
import { TurnosListaComponent } from './turnos-lista/turnos-lista.component';
import { EspecialidadesListaComponent } from './especialidades-lista/especialidades-lista.component';
import { TurnoDetalleComponent } from './turno-detalle/turno-detalle.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TurnoFiltroComponent } from './turno-filtro/turno-filtro.component';

import { PipesModule } from '../pipes/pipes.module';
import { DirectivasModule } from '../directivas/directivas.module';
import { GraficosComponent } from './graficos/graficos.component';
import { LogListaComponent } from './log-lista/log-lista.component';

@NgModule({
  declarations: [
    LayoutComponent,
    UsuarioDetalleComponent,
    UsuariosListaComponent,
    TurnosListaComponent,
    EspecialidadesListaComponent,
    TurnoDetalleComponent,
    SpinnerComponent,
    TurnoFiltroComponent,
    GraficosComponent,
    LogListaComponent
  ],
  exports: [
    LayoutComponent,
    UsuarioDetalleComponent,
    UsuariosListaComponent,
    TurnosListaComponent,
    EspecialidadesListaComponent,
    TurnoDetalleComponent,
    SpinnerComponent,
    TurnoFiltroComponent,
    GraficosComponent,
    LogListaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PipesModule,
    DirectivasModule
  ]
})
export class ComponentsModule { }
