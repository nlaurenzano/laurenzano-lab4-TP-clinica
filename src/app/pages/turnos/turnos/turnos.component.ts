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
  private turnosInicial;
  public especialidades;
  public turnoSeleccionado = null;
  public especialidadSeleccionada = '';
  public usuarioSeleccionado = null;
  public datosTurnoFiltro = null;
  public usuarios;
  public subtitulo: string = '';

  constructor( 
    public authenticationService: AuthenticationService,
    public archivos: ArchivosService,
    public db: DbService ) {}

  ngOnInit() {
    this.mostrarTodos();
  }

  // Devuelve la lista de todos los turnos del usuario
  mostrarTodos() {
    this.turnoSeleccionado = null;

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
    this.turnos.then((turnos)=>{
        this.turnosInicial = turnos;
      });
  }

  get esAdmin() {
    return this.usuario.rol == 'administrador';
  }

  get esPaciente() {
    return this.usuario.rol == 'paciente';
  }

  get esEspecialista() {
    return this.usuario.rol == 'especialista';
  }

  filtrar() {
    this.filtro = true;
    this.turnoSeleccionado = null;
    this.especialidadSeleccionada = '';
    this.usuarioSeleccionado = null;
    this.especialidades = [];
    this.subtitulo = 'Seleccionar Especialidad';

    this.turnosInicial.filter((item)=>{
        if (!this.especialidades.includes(item.especialidad)) {
          this.especialidades.push(item.especialidad);
        }
      });
  }

  aplicarFiltro() {
    this.filtro = false;

    return this.turnos
      .then((turnos)=>{
        return  this.turnosInicial.filter((item)=>{
          if ( this.compararTurnoFiltro(item) ) {
            return item;
          }
        });
      });
  }


  // Devuelve true si el turno coincide con los datos del filtro
  private compararTurnoFiltro( turno ) {
    let email = turno.especialista.email;
    if ( this.usuario.rol == 'especialista' ) {
      email = turno.paciente.email;
    }

    if ( turno.especialidad != this.especialidadSeleccionada || email != this.usuarioSeleccionado.email ) {
      return false;
    }

    // Pacientes y Especialistas además filtran por datos del turno
    if ( !this.esAdmin ) {

      if ( this.datosTurnoFiltro.horario != '' ) {
        if ( this.datosTurnoFiltro.horario != turno.horario ) {
          return false;
        }
      }

      if ( this.datosTurnoFiltro.estado != '' ) {
        if ( this.datosTurnoFiltro.estado != turno.estado ) {
          return false;
        }
      }

      // Los turnos finalizados, además tienen historia clínica
      if ( turno.estado == 'finalizado' ) {

        if ( this.datosTurnoFiltro.historia.altura != '' ) {
          if ( this.datosTurnoFiltro.historia.altura != turno.historia.altura ) {
            return false;
          }
        }

        if ( this.datosTurnoFiltro.historia.peso != '' ) {
          if ( this.datosTurnoFiltro.historia.peso != turno.historia.peso ) {
            return false;
          }
        }

        if ( this.datosTurnoFiltro.historia.temperatura != '' ) {
          if ( this.datosTurnoFiltro.historia.temperatura != turno.historia.temperatura ) {
            return false;
          }
        }

        if ( this.datosTurnoFiltro.historia.presion != '' ) {
          if ( this.datosTurnoFiltro.historia.presion != turno.historia.presion ) {
            return false;
          }
        }

        for ( let i = 0; i < 6; i++ ) {
          if ( this.datosTurnoFiltro.historia.datosDinamicos[i].clave != '' && this.datosTurnoFiltro.historia.datosDinamicos[i].valor != '' ) {
            if ( this.datosTurnoFiltro.historia.datosDinamicos[i].clave != turno.historia.datosDinamicos[i].clave || 
                  this.datosTurnoFiltro.historia.datosDinamicos[i].valor != turno.historia.datosDinamicos[i].valor ) {
              return false;
            }
          }
        }
      }
    }

    return true;
  }


  seleccionarTurno( valor ) {
    this.turnoSeleccionado = valor;
  }

  seleccionarEspecialidad( valor ) {
    this.especialidadSeleccionada = valor;
    this.subtitulo = this.esEspecialista ? 'Seleccionar Paciente' : 'Seleccionar Especialista';
    this.mostrarUsuarios();
  }

  seleccionarUsuario( valor ) {
    this.usuarioSeleccionado = valor;
    this.subtitulo = this.esAdmin ? '' : 'Seleccionar Datos del Turno';
  }

  agregarDatosTurno( valor ) {
    this.datosTurnoFiltro = valor;
    this.subtitulo = '';
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

    this.turnosInicial.forEach((item)=>{
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

    this.usuarios = usuarios;
  }


}
