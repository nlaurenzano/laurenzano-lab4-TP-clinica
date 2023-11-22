import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Usuario } from '../../../servicios/authentication.service';
import { ArchivosService } from "../../../servicios/archivos.service";
import { DbService } from '../../../servicios/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  fillEmail: string = '';
  fillClave: string = '';

  public usuarios = [];

  private roles = ['administrador', 'especialista', 'paciente'];

  constructor( 
    public authenticationService: AuthenticationService,
    public archivos: ArchivosService,
    public db: DbService
  ) { }

  ngOnInit() {
    this.mostrarAccesoRapido();
  }

  completarCampos( id: number ) {
    // this.fillEmail = 'admin1@clinica.com';
    this.fillEmail = this.usuarios[id].email;
    this.fillClave = "password";
  }

  mostrarAccesoRapido() {
    const usuarios = [
      '4aMSrSRpi3P38FFk4HJNY12vOti2',
      'H2G6lT8VarY2Y0QYKRtIKqjKyJv2',
      'i8eVXG53UybmFk10fkSIpJsKNAB2',
      'SIVh2oT1WcNosem0uiGOs4aJSyu1',
      'sHXGRWQFGSZLV9IkJh6u6cVai5E2',
      '0pR5STCxLkN5QBKnMcUPMEb7kIG3'];
      // 'iCs9X2zMctg3LEPFJH6rfOWeC3E3'];

    usuarios.forEach((item) => {
      // console.log('usuario', item);
      this.db.obtenerUsuarioPorUid( item )
        .then((usuario) => {
          this.archivos.obtenerImagen_1(usuario.email)
            .then((archivoURL) => {
              usuario.archivoURL = archivoURL;
              this.usuarios.push(usuario);
            });

        });
    });
  }

  mostrarIcono( usuario ): string {
    let icono = '';
    switch(usuario.rol) {
      case this.roles[0]:
        icono = 'fa-solid fa-screwdriver-wrench';
        break;
      case this.roles[1]:
        icono = 'fas fa-stethoscope';
        break;
      case this.roles[2]:
        icono = 'fa-solid fa-hospital-user';
        break;
      default:
        // nada
    } 
    return icono;
  }

}
