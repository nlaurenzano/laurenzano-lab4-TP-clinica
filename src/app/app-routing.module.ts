import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  // { path: '', redirectTo:'/home', pathMatch:'full' },
  {
    path: '',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'turnos',
    loadChildren: () => import('./pages/turnos/turnos.module').then(m => m.TurnosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'errores',
    loadChildren: () => import('./pages/errores/errores.module').then(m => m.ErroresModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/errores/errores.module').then(m => m.ErroresModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
