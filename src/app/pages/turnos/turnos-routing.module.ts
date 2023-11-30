import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TurnosComponent } from './turnos/turnos.component';
import { SolicitudComponent } from './solicitud/solicitud.component';

const routes: Routes = [
  {
    path: 'turnos',
    component: TurnosComponent
  },
  {
    path: 'solicitud',
    component: SolicitudComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
