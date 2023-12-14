import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from "../servicios/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class EspecialistaGuard implements CanActivate {
 
  constructor( public authenticationService: AuthenticationService ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.authenticationService.usuario.rol != 'especialista') {
      return false;
    }
    return true;
  }
  
}
