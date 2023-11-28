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
  public paciente = null;
  public especialista = null;
  public especialidad = null;
  public turnosDisponibles;

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
    this.paciente = this.authenticationService.usuario;
    this.mostrarEspecialistas();
  }

  // Obtiene los especialistas y muestra el listado
  async mostrarEspecialistas() {
    let usuarios = [];
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
    this.usuarios = [];
    this.especialista = usuario;
  }

  // Muestra los turnos generados
  mostrarTurnos( especialidad ) {


    // TODO: Obtener disponibilidad del especialista y duración de los turnos

    this.especialidad = especialidad;

    this.db.obtenerTurnosExistentes( this.paciente.email, this.especialista, this.especialidad )
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

      // if ( this.turnoDisponible( horario ) ) {
      //   turnosResult.push({
      //     horario: new Date(horario.toString()),
      //     especialista: this.especialista,
      //     especialidad: this.especialidad,
      //     paciente: this.paciente.email
      //   });
      // }

      turnosResult.push({
        disponible: this.turnoDisponible( horario ),
        horario: new Date(horario.toString()),
        especialista: this.especialista,
        especialidad: this.especialidad,
        paciente: this.paciente.email
      });

      horario.setMinutes(horario.getMinutes() + this.duracion); 
    }
    return turnosResult;
  }

  async confirmarTurno( turno ) {

    turno.estado = this.estados[0];
    await this.db.crearTurno( turno );
    

    // TODO: Redirigir a Mis Turnos
    this.mostrarTurnos(this.especialidad);
  }


  // Valido que el turno propuesto no se superpone con alguno existente
  turnoDisponible( horario ): boolean {
    let resultado = true;
    const duracion = this.duracion;

    if ( this.turnosExistentes.length > 0 ) {
      let turnoFin = new Date(horario.toString());
      turnoFin.setMinutes(turnoFin.getMinutes() + duracion); 

      this.turnosExistentes.forEach( function(turnoExistente) {
        let existenteFin = new Date(turnoExistente.horario.toString());
        existenteFin.setMinutes(existenteFin.getMinutes() + duracion); 

        if ( horario < existenteFin && turnoFin > turnoExistente.horario ) {
          resultado = false;
        }
      });
    }
    return resultado;
  }



}
