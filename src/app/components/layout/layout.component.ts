import { Component } from '@angular/core';
import { AuthenticationService } from "../../servicios/authentication.service";
import { ArchivosService } from "../../servicios/archivos.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  // @Input navItems: NavItem[] = [];

  constructor( public authenticationService: AuthenticationService, public archivos: ArchivosService ) {}

  get usuarioActual() {
    return this.authenticationService.usuario;
  }

  get nombreActual() {
    if (this.authenticationService.usuario) {
      return this.authenticationService.usuario.nombre;
    }
    return '';
  }

  get tituloUsuarios() {
    if (this.esEspecialista) {
      return 'Pacientes';
    } else {
      return 'Usuarios';
    }
  }

  get esAdmin() {
    if (this.authenticationService.usuario != null) {
      return this.authenticationService.usuario.rol == 'administrador';
    }
    return false;
  }

  get esEspecialista() {
    if (this.authenticationService.usuario != null) {
      return this.authenticationService.usuario.rol == 'especialista';
    }
    return false;
  }

  get esPaciente() {
    if (this.authenticationService.usuario != null) {
      return this.authenticationService.usuario.rol == 'paciente';
    }
    return false;
  }

}
