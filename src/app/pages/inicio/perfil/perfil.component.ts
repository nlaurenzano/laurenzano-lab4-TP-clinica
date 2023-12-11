import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Usuario } from "../../../servicios/authentication.service";
import { ArchivosService } from "../../../servicios/archivos.service";
import { DbService } from "../../../servicios/db.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuarioDetalle: Usuario = null;
  public usuarioImagenes: any;
  public configurandoHorario: boolean = false;
  public especialidadSeleccionada = '';
  public turnos;
  public turnosEspecialidades = [];

  private turnosInicial = [];
  private roles = ['administrador', 'especialista', 'paciente'];

  constructor( 
    public authenticationService: AuthenticationService,
    public archivos: ArchivosService,
    public db: DbService
  ) {}

  ngOnInit() {
    this.usuarioImagenes = [];
    this.usuarioImagenes = this.archivos.obtenerImagenes(this.authenticationService.usuario.email);
    this.usuarioDetalle = this.authenticationService.usuario;

    // Devuelve la lista de todos los turnos del paciente
    if ( this.esPaciente ) {
      // this.turnos = this.db.obtenerTurnosPacienteEstadoCantidad( this.usuarioDetalle, 'finalizado', 0 );
      this.turnos = this.db.obtenerTurnosPacienteEstadoCantidad( this.usuarioDetalle, 'finalizado', 0 );
      this.turnos.then((turnos)=>{
          this.turnosInicial = turnos;
          this.obtenerEspecialidadesTurnos();
      });
    }
  }

  get esEspecialista(): boolean {
    return this.usuarioDetalle.rol == this.roles[1];
  }

  get esPaciente(): boolean {
    return this.usuarioDetalle.rol == this.roles[2];
  }

  mostrarHorarios( especialidad ) {
    this.especialidadSeleccionada = especialidad;
    this.configurandoHorario = true;
  }

  mostrarTurnos( especialidad ) {
    this.especialidadSeleccionada = especialidad;
    this.turnos = this.filtrarTurnosPorEspecialidad();
  }

  mostrarEspecialidades() {
    this.configurandoHorario = false;
  }

  mostrarEspecialidadesTurnos() {
    this.especialidadSeleccionada = '';
  }

  private obtenerEspecialidadesTurnos() {
    this.turnosEspecialidades = [];
    this.turnosInicial.filter((item)=>{
      if (!this.turnosEspecialidades.includes(item.especialidad)) {
        this.turnosEspecialidades.push(item.especialidad);
      }
    });
  }

  private filtrarTurnosPorEspecialidad() {
    return this.turnos
      .then((turnos)=>{
        return this.turnosInicial.filter((item)=>{
          if ( item.especialidad == this.especialidadSeleccionada ) {
            return item;
          }
        });
      });
  }


}
