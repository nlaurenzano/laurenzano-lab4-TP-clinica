import { Component } from '@angular/core';
import { AuthenticationService, Usuario } from "../../../servicios/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // public loadingUsuarios: boolean = false;
  public usuario: Usuario = {
    id: '',
    rol: '',
    nombre: '',
    apellido: '',
    edad: '',
    dni: '',
    email: '',
    clave: '',
    obraSocial: '',
    especialidad: ''
  };

  private roles = ['admin', 'especialista', 'paciente'];
  public especialidades = ['Traumatología', 'Cardiología', 'Pediatría', 'Odontología'];
  public obrasSociales = ['OSDE', 'Swiss Medical', 'Hospital Británico', 'Apres', 'PAMI', 'Particular'];

  constructor( public authenticationService: AuthenticationService ) { }

  public signUp() {
    // console.log(this.usuario.especialidad);
    this.authenticationService.signUp(this.usuario);
  }

  public setAdmin() {
    this.usuario.rol = this.roles[1];
  }

  public setEspecialista() {
    this.usuario.rol = this.roles[2];
  }

  public setPaciente() {
    this.usuario.rol = this.roles[3];
  }

  get esEspecialista(): boolean {
    return this.usuario.rol == this.roles[2];
  }

  get esPaciente(): boolean {
    return this.usuario.rol == this.roles[3];
  }

  get esAdmin(): boolean {
    return this.usuario.rol == this.roles[1];
  }

}
