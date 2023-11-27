import { Component, Input } from '@angular/core';
import { ArchivosService } from "../../servicios/archivos.service";

@Component({
  selector: 'usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent {

  @Input() datos;
  @Input() imagenes: any = null;

  private roles = ['administrador', 'especialista', 'paciente'];

  constructor( public archivos: ArchivosService ) {}

  get esAdmin(): boolean {
    return this.datos.rol == this.roles[0];
  }

  get esEspecialista(): boolean {
    return this.datos.rol == this.roles[1];
  }

  get esPaciente(): boolean {
    return this.datos.rol == this.roles[2];
  }

}
