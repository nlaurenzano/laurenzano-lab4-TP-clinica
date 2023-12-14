import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { InformesComponent } from './informes/informes.component';
import { RolGuard } from '../../guards/rol.guard';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [RolGuard],
    data: {
        rolesRequeridos: ['administrador','especialista'],
        animation: 'Usuarios'
    }
  },
  {
    path: 'informes',
    component: InformesComponent,
    canActivate: [RolGuard],
    data: {
        rolesRequeridos: ['administrador'],
        animation: 'Informes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
