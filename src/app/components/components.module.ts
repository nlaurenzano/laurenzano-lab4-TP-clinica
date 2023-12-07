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

@NgModule({
  declarations: [
    LayoutComponent,
    UsuarioDetalleComponent,
    UsuariosListaComponent,
    TurnosListaComponent,
    EspecialidadesListaComponent,
    TurnoDetalleComponent,
    SpinnerComponent
  ],
  exports: [
    LayoutComponent,
    UsuarioDetalleComponent,
    UsuariosListaComponent,
    TurnosListaComponent,
    EspecialidadesListaComponent,
    TurnoDetalleComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class ComponentsModule { }
