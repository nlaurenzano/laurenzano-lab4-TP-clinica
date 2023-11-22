import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Usuario } from "../../../servicios/authentication.service";
import { ArchivosService } from "../../../servicios/archivos.service";
import { DbService } from "../../../servicios/db.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios;
  public usuarioDetalle: Usuario = null;
  public creandoAdmin: boolean = false;
  public imagenes: any;

  private roles = ['administrador', 'especialista', 'paciente'];

  constructor( 
    public authenticationService: AuthenticationService,
    public archivos: ArchivosService,
    public router: Router,
    public db: DbService
  ) {}

  ngOnInit() {
    this.mostrarTodos();
  }

  mostrarDetalle( usuario ) {
    this.imagenes = [];
    this.usuarioDetalle = usuario;
    
    // this.imagenURL = this.archivos.obtenerImagenes(usuario.email)[0];
    this.imagenes = this.archivos.obtenerImagenes(usuario.email);
    // this.imagenURL = imagenes[0];

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

  // Devuelve la lista de todos los usuarios
  mostrarTodos() {
    this.usuarioDetalle = null;
    this.usuarios = this.db.obtenerUsuarios();
  }

  // Devuelve la lista de todos los pacientes
  mostrarAdmins() {
    this.usuarios = this.db.obtenerUsuariosPorRol( this.roles[0] );
  }

  // Devuelve la lista de todos los pacientes
  mostrarEspecialistas() {
    this.usuarioDetalle = null;
    this.usuarios = this.db.obtenerUsuariosPorRol( this.roles[1] );
  }

  // Devuelve la lista de todos los pacientes
  mostrarPacientes() {
    this.usuarios = this.db.obtenerUsuariosPorRol( this.roles[2] );
  }

  get esAdmin(): boolean {
    return this.usuarioDetalle.rol == this.roles[0];
  }

  get esEspecialista(): boolean {
    return this.usuarioDetalle.rol == this.roles[1];
  }

  get esPaciente(): boolean {
    return this.usuarioDetalle.rol == this.roles[2];
  }

  crearAdmin() {
    this.authenticationService.creandoAdmin = true;
    this.router.navigate(['/auth/register']);

  }



}
