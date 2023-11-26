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

  constructor( public archivos: ArchivosService ) {}

  ngOnInit() {}

}
