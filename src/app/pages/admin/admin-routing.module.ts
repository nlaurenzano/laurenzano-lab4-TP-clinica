import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { RolGuard } from '../../guards/rol.guard';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [RolGuard],
    data: {
        rolesRequeridos: ['administrador','especialista']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
