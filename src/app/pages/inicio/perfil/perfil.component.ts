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
  }

  get esEspecialista(): boolean {
    return this.usuarioDetalle.rol == this.roles[1];
  }

  mostrarHorarios( especialidad ) {
    this.especialidadSeleccionada = especialidad;
    this.configurandoHorario = true;
  }

  mostrarEspecialidades() {
    this.configurandoHorario = false;
  }


}
