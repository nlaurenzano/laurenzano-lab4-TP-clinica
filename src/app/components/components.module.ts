import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';

@NgModule({
  declarations: [
    LayoutComponent,
    UsuarioDetalleComponent,
    UsuariosListaComponent
  ],
  exports: [
    LayoutComponent,
    UsuarioDetalleComponent,
    UsuariosListaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
