import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService, Usuario } from "../../../servicios/authentication.service";
import { ArchivosService } from "../../../servicios/archivos.service";
import { DbService } from "../../../servicios/db.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  clave2 = '';
  nombreImagen1 = '';
  nombreImagen2 = '';

  @ViewChild('nuevaEspecialidad') private inputNuevaEspecialidad: ElementRef;

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
    especialidad: '',
    habilitado: false
  };

  public especialidades;
  // public especialidades = ['Traumatología', 'Cardiología', 'Pediatría', 'Odontología'];
  public obrasSociales = ['OSDE', 'Swiss Medical', 'Hospital Británico', 'Apres', 'PAMI', 'Particular'];

  private roles = ['administrador', 'especialista', 'paciente'];
 
  constructor( 
    public authenticationService: AuthenticationService,
    public db: DbService,
    public archivos: ArchivosService
    ) {}

  ngOnInit() {
    this.archivos.limpiarImagenes();
    // Si se está creando un admin desde la vista de usuarios
    if ( this.authenticationService.creandoAdmin ) {
      this.usuario.rol = this.roles[0];
      this.authenticationService.creandoAdmin = false;
    }
    this.mostrarEspecialidades();
  }

  public signUp() {
    if ( this.usuario.clave != this.clave2 ) {
      this.authenticationService.mostrarError('Las claves ingresadas no son idénticas.');
    } else {
      this.authenticationService.signUp(this.usuario);
    }
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
    this.inputNuevaEspecialidad.nativeElement.value = '';
    this.usuario.especialidad = especialidad;
  }

   // Devuelve la lista de todas las especialidades
  mostrarEspecialidades() {
    this.especialidades = this.db.obtenerEspecialidades();
  }

  seleccionarImagen1( event: any ) {
    const archivo:File = event.target.files[0];

    if (archivo) {
      this.nombreImagen1 = archivo.name;
      this.archivos.seleccionarImagen( archivo, 1 );
    }
  }

  seleccionarImagen2( event: any ) {
    const archivo:File = event.target.files[0];

    if (archivo) {
      this.nombreImagen2 = archivo.name;
      this.archivos.seleccionarImagen( archivo, 2 );
    }
  }

  // seleccionarImagen( archivo: File, indice: number ) {
  //   if (archivo) {
  //     // const formData = new FormData();
  //     // formData.append("thumbnail", archivo);
  //     this.archivos.subirArchivo( archivo, this.usuario.email, indice );
  //   }
  // }


}
