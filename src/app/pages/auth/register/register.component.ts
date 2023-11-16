import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Usuario } from "../../../servicios/authentication.service";
import { DbService } from "../../../servicios/db.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // public loadingUsuarios: boolean = false;
  public usuario: Usuario = {
    rol: '',
    nombre: '',
    apellido: '',
    edad: '',
    dni: '',
    email: '',
    clave: '',
    obraSocial: '',
    especialidad: '',
    habilitado: false
  };

  public especialidades;
  // public especialidades = ['Traumatología', 'Cardiología', 'Pediatría', 'Odontología'];
  public obrasSociales = ['OSDE', 'Swiss Medical', 'Hospital Británico', 'Apres', 'PAMI', 'Particular'];
  private roles = ['administrador', 'especialista', 'paciente'];
 
  constructor( 
    public authenticationService: AuthenticationService,
    public db: DbService
    ) {}

  ngOnInit() {
    this.mostrarEspecialidades();
  }

  public signUp() {
    this.authenticationService.signUp(this.usuario);
  }

  public setAdmin() {
    this.usuario.rol = this.roles[0];
  }

  public setEspecialista() {
    this.usuario.rol = this.roles[1];
  }

  public setPaciente() {
    this.usuario.rol = this.roles[2];
  }

  get esAdmin(): boolean {
    return this.usuario.rol == this.roles[0];
  }

  get esEspecialista(): boolean {
    return this.usuario.rol == this.roles[1];
  }

  get esPaciente(): boolean {
    return this.usuario.rol == this.roles[2];
  }

  agregarEspecialidad( especialidad ) {
    // TODO: Validar que no se ingrese cualquier cosa

    this.db.agregarEspecialidad( especialidad );
    this.mostrarEspecialidades();
    this.usuario.especialidad = especialidad;
  }

   // Devuelve la lista de todas las especialidades
  mostrarEspecialidades() {
    this.especialidades = this.db.obtenerEspecialidades();
  }

}
