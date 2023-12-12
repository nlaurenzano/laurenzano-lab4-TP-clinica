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
  public usuarioImagenes: any;
  public turnosPaciente = null;

  private usuario;
  private roles = ['administrador', 'especialista', 'paciente'];

  constructor( 
    public authenticationService: AuthenticationService,
    public archivos: ArchivosService,
    public router: Router,
    public db: DbService
  ) {}

  ngOnInit() {
    this.usuario = this.authenticationService.usuario;
    this.mostrarTodos();
  }

  mostrarDetalle( usuario ) {
    this.usuarioImagenes = [];
    this.usuarioDetalle = usuario;
    this.usuarioImagenes = this.archivos.obtenerImagenes(usuario.email);
    this.turnosPaciente = null;

    // Buscar turnos, si se seleccionó un paciente
    if ( this.usuarioDetalle.rol == this.roles[2] ) {
      let cantidadTurnos = 0;
      // Si el usuario logueado es especialista, solo se muestran 3 turnos
      if ( this.esEspecialista ) {
        cantidadTurnos = 3;
      }
      this.turnosPaciente = this.db.obtenerTurnosPacienteEspEstadoCantidad( this.usuarioDetalle, this.usuario, 'finalizado', cantidadTurnos );
    }
  }

  // Devuelve la lista de todos los usuarios
  mostrarTodos() {
    this.usuarioDetalle = null;
    this.turnosPaciente = null;

    if ( this.esEspecialista ) {
      this.usuarios = this.db.obtenerPacientes( this.usuario );
    } else {
      this.usuarios = this.db.obtenerUsuarios();
    }
  }

  // Devuelve la lista de todos los pacientes
  mostrarAdmins() {
    this.usuarioDetalle = null;
    this.turnosPaciente = null;
    this.usuarios = this.db.obtenerUsuariosPorRol( this.roles[0] );
  }

  // Devuelve la lista de todos los pacientes
  mostrarEspecialistas() {
    this.usuarioDetalle = null;
    this.turnosPaciente = null;
    this.usuarios = this.db.obtenerUsuariosPorRol( this.roles[1] );
  }

  // Devuelve la lista de todos los pacientes
  mostrarPacientes() {
    this.usuarioDetalle = null;
    this.turnosPaciente = null;
    this.usuarios = this.db.obtenerUsuariosPorRol( this.roles[2] );
  }

  get esAdmin(): boolean {
    return this.usuario.rol == this.roles[0];
  }

  get esEspecialista(): boolean {
    return this.usuario.rol == this.roles[1];
  }

  get esPaciente(): boolean {
    return this.usuario.rol == this.roles[2];
  }

  crearAdmin() {
    this.authenticationService.creandoAdmin = true;
    this.router.navigate(['/auth/register']);

  }

  async toggleHabilitar( usuario ) {
    await this.db.habilitarUsuario( usuario.id, !usuario.habilitado );
    usuario.habilitado = !usuario.habilitado;
  }

}
