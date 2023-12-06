import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from "../../../servicios/authentication.service";
import { ArchivosService } from "../../../servicios/archivos.service";
import { DbService } from "../../../servicios/db.service";

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  usuario = this.authenticationService.usuario;
  public filtro: boolean = false;
  public turnos;
  public especialidades;
  public turnoSeleccionado = null;
  public especialidadSeleccionada = '';
  public usuarioSeleccionado = null;
  public usuarios;

  constructor( 
    public authenticationService: AuthenticationService,
    public archivos: ArchivosService,
    public db: DbService ) {}

  ngOnInit() {
    this.mostrarTodos();
  }

  // Devuelve la lista de todos los turnos del usuario
  mostrarTodos() {

    switch (this.usuario.rol) {
      case 'paciente':
        this.turnos = this.db.obtenerTurnosPaciente( this.usuario );
      break;

      case 'especialista':
        this.turnos = this.db.obtenerTurnosEspecialista( this.usuario );
      break;

      default:
        // admin
        this.turnos = this.db.obtenerTurnos();
      break;
    }
  }

  get esAdmin() {
    return this.usuario.rol == 'administrador';
  }

  filtrar() {
    this.filtro = true;
    this.especialidadSeleccionada = '';
    this.usuarioSeleccionado = null;
    this.especialidades = [];
    this.turnos
      .then((turnos)=>{
        turnos.forEach((item)=>{
          if (!this.especialidades.includes(item.especialidad)) {
            this.especialidades.push(item.especialidad);
          }
        });
      });
  }

  aplicarFiltro() {
    let turnosFiltrados = [];
    
    this.filtro = false;
    return this.turnos
      .then((turnos)=>{
        // console.log('turnos '+item.especialidad);
        turnos.forEach((item)=>{
          let email = item.especialista.email;
          if ( this.usuario.rol == 'especialista' ) {
            email = item.paciente.email;
          }

          if ( item.especialidad == this.especialidadSeleccionada && email == this.usuarioSeleccionado.email ) {
            turnosFiltrados.push(item);
          }
        });
        return turnosFiltrados;
      });

    // this.turnos = turnosFiltrados;
  }

  seleccionarTurno( valor ) {
    this.turnoSeleccionado = valor;
  }

  seleccionarEspecialidad( valor ) {
    this.especialidadSeleccionada = valor;
    this.mostrarUsuarios();
  }

  seleccionarUsuario( valor ) {
    this.usuarioSeleccionado = valor;
    this.turnos = this.aplicarFiltro();
  }

  // Obtiene los usuarios y muestra el listado
  async mostrarUsuarios() {
    let usuarios = [];
    let rol = 'especialista';

    if ( this.usuario.rol == 'especialista' ) {
      // Se buscan los especialistas
      rol = 'paciente';
    }

    this.turnos
      .then((turnos)=>{

        turnos.forEach((item)=>{
          if ( item.especialidad == this.especialidadSeleccionada ) {
            let usuario = item.especialista;
            if ( this.usuario.rol == 'especialista' ) {
              usuario = item.paciente;
            }
            if ( usuarios.every((usuarioTest)=>{return usuarioTest.email!=usuario.email}) ) {
              usuarios.push(usuario);
            }
          }
        });

        usuarios.forEach((usuario) => {
          this.archivos.obtenerImagen_1(usuario.email)
            .then((archivoURL) => {
              usuario.archivoURL = archivoURL;
            });
        });
      });

    this.usuarios = usuarios;
  }







}
