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
  public subtitulo: string = 'Seleccionar Especialista';

  private estados = ['asignado'];
  private turnosExistentes = null;
  private duracion: number = 30;

  constructor( 
    public authenticationService: AuthenticationService,
    public archivos: ArchivosService,
    public db: DbService ) {}

  ngOnInit() {

    if (this.esAdmin) {
      this.mostrarPacientes();
    } else {
      this.seleccionarPaciente(this.authenticationService.usuario);
    }
  }

  get esAdmin() {
    return this.authenticationService.usuario.rol == 'administrador';
  }

  seleccionarPaciente( usuario ) {
    this.paciente = usuario;
    this.mostrarEspecialistas();
  }

  // Obtiene los pacientes y muestra el listado
  async mostrarPacientes() {
    let usuarios = [];
    this.subtitulo = 'Seleccionar Paciente';
    await this.db.obtenerUsuariosPorRol( 'paciente' )
            .then((pacientes) => {
              usuarios = pacientes;
            });

    usuarios.forEach((usuario) => {
      this.archivos.obtenerImagen_1(usuario.email)
        .then((archivoURL) => {
          usuario.archivoURL = archivoURL;
        });
    });
    this.usuarios = usuarios;
  }

  // Obtiene los especialistas y muestra el listado
  async mostrarEspecialistas() {
    let usuarios = [];
    this.subtitulo = 'Seleccionar Especialista';
    await this.db.obtenerUsuariosPorRol( 'especialista' )
            .then((especialistas) => {
              usuarios = especialistas;
            });

    usuarios.forEach((usuario) => {
      this.archivos.obtenerImagen_1(usuario.email)
        .then((archivoURL) => {
          usuario.archivoURL = archivoURL;
        });
    });
    this.usuarios = usuarios;
  }

  // Recibe la selección de la lista y muestra las especialidades para ese especialista
  mostrarEspecialidades( usuario ) {
    this.usuarios = [];
    this.especialista = usuario;
    this.subtitulo = 'Seleccionar Especialidad';
  }

  // Muestra los turnos generados
  mostrarTurnos( especialidad ) {

    // TODO: Obtener disponibilidad del especialista y duración de los turnos

    this.subtitulo = 'Seleccionar Turno';
    this.especialidad = especialidad;

    this.db.obtenerTurnosExistentes( this.paciente, this.especialista, this.especialidad )
      .then((turnosExistentes) => {
        this.turnosExistentes = turnosExistentes;
        this.turnosDisponibles = this.generarTurnos();
      });

    this.subtitulo = 'Seleccionar Turno';
  }

  
  // Genera la lista de todos los turnos disponibles
  async generarTurnos() {
    
    const cantidadDias = 15;

    let turnosResult = [];
    let horariosInicio;
    let horariosFin;

    // Un elemento por cada día de la semana, empezando por el lunes
    // Obtengo la disponibilidad real del especialista, para la especialidad seleccionada.
    // Y la duración mínima de un turno, en minutos.
    const horarios = await this.db.obtenerHorarios( this.especialista.email, this.especialidad );

    // Si no hay resultados, se configuran los valores por defecto (para toda la semana)
    // Lunes a viernes 8:00 a 19:00 y sábados de 8:00 a 14:00. Turnos de 30 muinutos.
    let horariosInicioAux = [
      {hora:0,min:0}, 
      {hora:8,min:0}, 
      {hora:8,min:0}, 
      {hora:8,min:0}, 
      {hora:8,min:0}, 
      {hora:8,min:0}, 
      {hora:8,min:0}
    ];
    let horariosFinAux = [
      {hora:0,min:0}, 
      {hora:19,min:0}, 
      {hora:19,min:0}, 
      {hora:19,min:0}, 
      {hora:19,min:0}, 
      {hora:19,min:0}, 
      {hora:14,min:0}
    ];

    if ( horarios != null ) {
      // Se usan los horarios configurados por el especialista
      horariosInicioAux = horarios.horariosInicio;
      horariosFinAux = horarios.horariosFin;
      this.duracion = horarios.duracion;
    }

    horariosInicio = horariosInicioAux.map(
      (value) => {
        let inicioAux = new Date();
        inicioAux.setHours( value.hora, value.min, 0 );
        return inicioAux; 
      });

    horariosFin = horariosFinAux.map(
      (value) => {
        let finAux = new Date();
        finAux.setHours( value.hora, value.min, 0 );
        return finAux; 
      });

    // En horas
    const duracionHoras: number = this.duracion / 60;

    // Para cada día: generar turnos, con los horarios obtenidos.
    for ( let i=0; i < cantidadDias; i++ ) {

      // Creo el día donde se van a generar los turnos
      let turno = new Date();
      turno.setDate( turno.getDate() + i );

      let diaSemana = turno.getDay();
      if ( diaSemana == 0) {
        // Es domingo, no damos turnos
        continue;
      }

      let horaInicio = horariosInicio[diaSemana].getHours();
      let minutosInicio = horariosInicio[diaSemana].getMinutes();
      turno.setHours( horaInicio, minutosInicio, 0 );
      let inicioDia = horaInicio + ( minutosInicio / 60 )  // En horas

      let horaFin = horariosFin[diaSemana].getHours();
      let minutosFin = horariosFin[diaSemana].getMinutes();
      let finDia = horaFin + ( minutosFin / 60 )  // En horas

      let turnosDia = [];

      for ( let hora = inicioDia; hora < finDia; hora+=duracionHoras ) {
        turnosDia.push({
          disponible: this.turnoDisponible( turno ),
          horario: new Date(turno.toString()),
          especialista: this.especialista,
          especialidad: this.especialidad,
          paciente: this.paciente
        });

        turno.setMinutes( turno.getMinutes() + this.duracion );
      }

      turnosResult.push(turnosDia);

    }

    return turnosResult;
  }


  // Crea el turno en DB y 
    // TODO: muestra confirmación o redirige
  async confirmarTurno( turno ) {

    turno.estado = this.estados[0];
    await this.db.crearTurno( turno );
    

    // TODO: Redirigir a Mis Turnos
    this.mostrarTurnos(this.especialidad);
  }


  // Valido que el turno propuesto no se superpone con alguno existente
  turnoDisponible( horario ): boolean {

      // TODO: Si el turno es hoy y ya pasó el horario de inicio, se marca como no disponible
      // if ( i == 0 && turno >  ) {
      //   deshabilitar = true;
      // }

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
