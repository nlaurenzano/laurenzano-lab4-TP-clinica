import { Component, OnInit } from '@angular/core';

import { AuthenticationService, Usuario } from '../../../servicios/authentication.service';
import { ArchivosService } from "../../../servicios/archivos.service";
import { DbService } from '../../../servicios/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  fillEmail: string = '';
  fillClave: string = '';

  public usuarios = [];

  private roles = ['administrador', 'especialista', 'paciente'];

  constructor( 
    public authenticationService: AuthenticationService,
    public archivos: ArchivosService,
    public db: DbService
  ) { }

  ngOnInit() {
    this.mostrarAccesoRapido();
  }

  completarCampos( id: number ) {
    this.fillEmail = this.usuarios[id].email;
    this.fillClave = this.usuarios[id].clave;
  }

  async mostrarAccesoRapido() {
    let usuarios = [];    

    const pacientes = await this.db.obtenerUsuariosPorRol( this.roles[2] );
    usuarios.push(pacientes[0]);
    usuarios.push(pacientes[1]);
    usuarios.push(pacientes[2]);

    const especialistas = await this.db.obtenerUsuariosPorRol( this.roles[1] );
    usuarios.push(especialistas[0]);
    usuarios.push(especialistas[1]);
    
    const admins = await this.db.obtenerUsuariosPorRol( this.roles[0] );
    usuarios.push(admins[0]);

    usuarios.forEach((usuario) => {
      this.archivos.obtenerImagen_1(usuario.email)
        .then((archivoURL) => {
          usuario.archivoURL = archivoURL;
        });
    });
    this.usuarios = usuarios;
  }

  mostrarIcono( usuario ): string {
    let icono = '';
    switch(usuario.rol) {
      case this.roles[0]:
        icono = 'fa-solid fa-screwdriver-wrench';
        break;
      case this.roles[1]:
        icono = 'fas fa-stethoscope';
        break;
      case this.roles[2]:
        icono = 'fa-solid fa-hospital-user';
        break;
      default:
        // nada
    } 
    return icono;
  }

}
