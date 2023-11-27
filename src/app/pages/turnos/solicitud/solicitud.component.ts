import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from "../../../servicios/authentication.service";
import { ArchivosService } from "../../../servicios/archivos.service";
import { DbService } from "../../../servicios/db.service";

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  public usuarios;
  public especialista = null;
  public especialidad = null;
  public turnosDisponibles;
  public turnoSeleccionado = null;

// TODO: Eliminar harcodeo
  public especialistaSeleccion = '8tk9r5ua@cj.MintEmail.com';
  public especialidadSeleccion = 'traumatología';
  private duracion: number = 30;  // En minutos

  private estados = ['asignado'];
  private turnosExistentes = null;

  constructor( 
    public authenticationService: AuthenticationService,
    public archivos: ArchivosService,
    public db: DbService ) {}

  ngOnInit() {
    this.mostrarEspecialistas();
    // this.mostrarTurnos();
  }

  // Obtiene los especialistas y muestra el listado
  async mostrarEspecialistas() {
    let usuarios = [];
    // const especialistas = await this.db.obtenerUsuariosPorRol( 'especialista' );

    await this.db.obtenerUsuariosPorRol( 'especialista' )
            .then((especialistas) => {
              usuarios = especialistas;
            });

    usuarios.forEach((especialista) => {
      this.archivos.obtenerImagen_1(especialista.email)
        .then((archivoURL) => {
          especialista.archivoURL = archivoURL;
        });
    });
    this.usuarios = usuarios;

  }


  // Recibe la selección de la lista y muestra las especialidades para ese especialista
  mostrarEspecialidades( usuario ) {
    this.especialista = usuario;
    console.log('email: '+this.especialista.email);
    console.log('especialidades: '+this.especialista.especialidad);



  }




  // Muestra los turnos generados
  mostrarTurnos() {
    const usuario = this.authenticationService.usuario;


    // TODO: Obtener disponibilidad del especialista y duración de los turnos


    this.db.obtenerTurnosExistentes( usuario.email, this.especialistaSeleccion, this.especialidadSeleccion )
      .then((turnosExistentes) => {
        this.turnosExistentes = turnosExistentes;
        this.turnosDisponibles = this.generarTurnos();
      });
  }

  

  // Genera la lista de todos los turnos disponibles
  async generarTurnos() {
    let turnosResult = [];

    const horaInicio: number = 9;
    const horaFin: number = 19;
    const duracionHoras: number = this.duracion / 60;  // En horas
    const horario = new Date();
    horario.setHours(horaInicio, 0, 0);

    for ( let hora = horaInicio; hora < horaFin; hora+=duracionHoras ) {

      if ( this.turnoDisponible( horario ) ) {
        turnosResult.push({
          horario: new Date(horario.toString()),
          especialista: this.especialistaSeleccion,
          especialidad: this.especialidadSeleccion,
          paciente: this.authenticationService.usuario.email
        });
      }

      horario.setMinutes(horario.getMinutes() + this.duracion); 
    }
    return turnosResult;
  }

  async confirmarTurno() {
    this.turnoSeleccionado.estado = this.estados[0];
    await this.db.crearTurno( this.turnoSeleccionado );
    this.mostrarTurnos();
  }

  set setTurno( turno ) {
    this.turnoSeleccionado = turno;
  }


  turnoDisponible( horario ): boolean {
    let resultado = true;
    const duracion = this.duracion;

    if ( this.turnosExistentes.length > 0 ) {
      let turnoFin = new Date(horario.toString());
      turnoFin.setMinutes(turnoFin.getMinutes() + duracion); 

      this.turnosExistentes.forEach( function(turnoExistente) {
        let existenteFin = new Date(turnoExistente.horario.toString());
        existenteFin.setMinutes(existenteFin.getMinutes() + duracion); 

        // Valido que el turno propuesto no se superpone con alguno existente
        if ( horario < existenteFin && turnoFin > turnoExistente.horario ) {
          resultado = false;
        }
      });
    }
    return resultado;
  }



}
