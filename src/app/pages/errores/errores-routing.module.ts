import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { VerificarComponent } from './verificar/verificar.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  },
  {
    path: 'verificar',
    component: VerificarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErroresRoutingModule { }
