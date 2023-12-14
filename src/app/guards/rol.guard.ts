import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from "../servicios/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  
  constructor( public authenticationService: AuthenticationService ) {}

   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const rolesRequeridos = route.data.rolesRequeridos;

    return rolesRequeridos.some((rol)=>{
      return this.authenticationService.usuario.rol == rol;
    });

  }
  
}
