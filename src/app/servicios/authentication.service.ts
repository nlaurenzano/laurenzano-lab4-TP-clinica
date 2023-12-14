import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { traceUntilFirst } from '@angular/fire/performance';
import { map } from 'rxjs/operators';
import { EMPTY, Observable, Subscription } from 'rxjs';
import Toastify from 'toastify-js';

import { ArchivosService } from "./archivos.service";
import { DbService } from './db.service';
import { LogService } from './log.service';
import { 
  User,
  Auth,
  signOut,
  authState,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
  // getUser
  } from "@angular/fire/auth";

// import { LogService } from './log.service';


export interface Usuario {
  id: string,
  rol: string,
  nombre: string,
  apellido: string,
  edad: string,
  dni: string,
  email: string,
  clave: string,
  obraSocial: string,    // Pacientes
  especialidad: any,  // Especialistas
  // especialidad: string[],  // Especialistas
  habilitado: boolean,  // Especialistas
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {

  public readonly usuarioAuth: Observable<User | null> = EMPTY;
  public usuario: Usuario = null;
  public usuarioImg;
  public isLoggedIn = false;
  public creandoAdmin = false;

  private readonly urlLogin: string = 'https://clinica-6b04b.web.app/auth/login';
  private readonly userDisposable: Subscription|undefined;

  constructor( 
    public auth: Auth, 
    public db: DbService, 
    public router: Router,
    public log: LogService, 
    public archivos: ArchivosService
  ) {
    if (auth) {
      this.usuarioAuth = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  // Log in con email/clave
  signIn(email: string, clave: string) {

    signInWithEmailAndPassword(this.auth, email, clave)
      .then((resultado) => {

        // Primero obtener usuario, después validar ingreso
        this.db.obtenerUsuarioPorUid( resultado.user.uid )
          .then((usuario) => {
            this.usuario = usuario;

            this.validarIngreso( resultado.user )
              .then((mensajeValidacion) => {
                if (mensajeValidacion == '') {
                  // Obtiene la imagen
                  this.archivos.obtenerImagen_1( email )
                    .then((archivoURL) => {
                      this.usuarioImg = archivoURL;
                    });

                  // Log de ingreso
                  this.log.signIn(usuario);

                  // Redirección
                  this.redirigir(resultado.user);

                } else {
                  this.usuario = null;
                  this.signOut( false );
                  this.mostrarError(mensajeValidacion);
                }
              });
          });
      })
      .catch((error) => {
        let mensaje: string;
        switch(error.code) {
          case 'auth/invalid-email':
            mensaje = 'Formato de correo inválido';
            break;
          case 'auth/user-disabled':
            mensaje = 'Usuario deshabilitado';
            break;
          default:
            mensaje = 'Usuario o clave incorrectos';
            // mensaje = error.code;
        }
        this.mostrarError(mensaje);
        
      });

  }

  // El parámetro 'log' indica si se registra la actividad en el log
  signOut( log: boolean ) {
    if ( log ) {
      // Log de salida
      this.log.signOut(this.usuario);
    }

    this.usuario = null;
    this.usuarioImg = '';
    signOut(this.auth);
  }

  // Registro con email, nombre y clave
  signUp( usuario: Usuario ) {

    createUserWithEmailAndPassword(this.auth, usuario.email, usuario.clave)
      .then((resultado) => {
        this.archivos.subirArchivos( usuario.email );

        // this.db.agregarUsuario( resultado.user.uid, usuario );
        this.db.agregarUsuario( resultado.user.uid, usuario )
          .then(()=>{
            // Log de registro
            this.log.signUp(usuario);
            
            // Redirección
            this.redirigir(resultado.user);

            if ( this.enviarVerificacion(resultado.user, usuario) ) {
              this.signOut( false );
            }
          });

        // .then(...)
        // .catch(...)

      })
      .catch((error) => {
        let mensaje: string;
        switch(error.code) {
          case "auth/invalid-email":
            mensaje = "Formato de correo inválido";
            break;
          case "auth/email-already-in-use":
            mensaje = "El correo ingresado ya está en uso";
            break;
          case "auth/weak-password":
            mensaje = "La clave no es segura";
            break;
          default:
            mensaje = "Ocurrió un error inesperado";
        } 
        // this.mostrarError(error.code);
        this.mostrarError(mensaje);
      });
  }

  // Redirige al usuario según su rol
  async redirigir( user: User ) {
    if ( this.usuario == null ) {
      this.usuario = await this.db.obtenerUsuarioPorUid( user.uid );
    }

    if ( this.usuario.rol == 'administrador') {
      this.router.navigate(['admin/usuarios']);
    } else {
      if ( user.emailVerified ) {
        this.router.navigate(['inicio/perfil']);
      } else {
        this.router.navigate(['errores/verificar']);
      }
    }
  }

  // Valida si el usuario puede ingresar
  async validarIngreso( user: User ) {
    if ( this.usuario == null ) {
      this.usuario = await this.db.obtenerUsuarioPorUid( user.uid );
    }

    // Los usuarios con perfil Especialista solo pueden ingresar si un usuario administrador
    // aprobó su cuenta y verificó el mail al momento de registrarse.
    // Los usuarios con perfil Paciente solo pueden ingresar si verificaron su mail al
    // momento de registrarse.
    if ( (this.usuario.rol == 'especialista' && !user.emailVerified) || 
      (this.usuario.rol == 'paciente' && !user.emailVerified) ) {
      return 'Debe verificar su correo electrónico para ingresar.';
    }

    if (this.usuario.rol == 'especialista' && !this.usuario.habilitado ) {
      return 'Su cuenta debe ser habilitada por Administración para ingresar.';
    }

    return '';
  }

  private enviarVerificacion( user: User, datosUsuario: Usuario ): boolean {
    // Pacientes y Especialistas deben verificar el email
    if (datosUsuario.rol != 'administrador') {
      // Configura el correo en español
      this.auth.languageCode = 'es';
      const actionCodeSettings = {
        url: this.urlLogin,
        handleCodeInApp: false
      };
      sendEmailVerification(user, actionCodeSettings);
      return true;
    }
    return false;
  }






  // Devuelve true si el usuario está logueado
  // get isLoggedIn(): boolean {
  //   return this.usuario !== null ? true : false;
  // }

  // Devuelve el nombre del usuario logueado o null
  // get getUsuarioActual(): string {
  //   if ( this.usuario ) {
  //     return this.usuario.displayName !== null ? this.usuario.displayName : this.usuario.email;
  //   } else {
  //     return '';
  //   }
  // }


  mostrarError(mensaje: String) {
    Toastify({
      text: mensaje,
      duration: 3000,
      position: 'center',
      className: 'toast-lower',
      close: true,
      stopOnFocus: true,
      style: { color: "#701a28", background: "linear-gradient(to right, #ff8a9d, #ff8a9d)" }
    }).showToast();
  }

}
