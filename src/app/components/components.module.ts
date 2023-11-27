import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';
import { TurnosListaComponent } from './turnos-lista/turnos-lista.component';

@NgModule({
  declarations: [
    LayoutComponent,
    UsuarioDetalleComponent,
    UsuariosListaComponent,
    TurnosListaComponent
  ],
  exports: [
    LayoutComponent,
    UsuarioDetalleComponent,
    UsuariosListaComponent,
    TurnosListaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
