import { Injectable } from '@angular/core';
// import { LogService } from './log.service';

import { Auth, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";
import { Router } from '@angular/router';

// import Toastify from 'toastify-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  usuario: any = null;

  constructor(
    public auth: Auth,
    public router: Router
    ) {}

  // Log in con email/clave
  signIn(email: string, clave: string) {

    signInWithEmailAndPassword(this.auth, email, clave)
      .then((resultado) => {
        // Log de ingreso
        // this.logService.signIn(email);
        // console.log('nombre: '+resultado.user.displayName);
        
        // Redirección
        this.router.navigate(['/']);
      })
      .catch((error) => {
        let mensaje: string;
        switch(error.code) {
          case "auth/invalid-email":
            mensaje = "Formato de correo inválido";
            break;
          case "auth/user-disabled":
            mensaje = "Usuario deshabilitado";
            break;
          default:
            mensaje = "Usuario o clave incorrectos";
            // mensaje = error.code;
        }
        this.mostrarError(mensaje);
        
      });

  }

  signOut() {

    signOut(this.auth);

    // if (this.usuario !== null) {
    //   // Log de salida
    //   this.logService.signOut(this.usuario.email);

    //   this.afAuth.signOut().then(() => {
    //     // Redirección
    //     this.router.navigate(['home']);
    //   });
    // }
  }



  // Registro con email, nombre y clave
  // signUp(email: string, nombre: string, clave: string) {
  //   return this.afAuth
  //     .createUserWithEmailAndPassword(email, clave)
  //     .then((resultado) => {
  //       resultado.user.updateProfile({ displayName: nombre });
  //       // .then(...)
  //       // .catch(...)
        
  //       console.log('nombre: '+resultado.user.displayName);

  //       // Log de registro
  //       this.logService.signUp(email);
  //       // Redirección
  //       this.router.navigate(['home']);
  //     })
  //     .catch((error) => {
  //       let mensaje: string;
  //       switch(error.code) {
  //         case "auth/invalid-email":
  //           mensaje = "Formato de correo inválido";
  //           break;
  //         case "auth/email-already-in-use":
  //           mensaje = "El correo ingresado ya está en uso";
  //           break;
  //         case "auth/weak-password":
  //           mensaje = "La clave no es segura";
  //           break;
  //         default:
  //           mensaje = "Ocurrió un error inesperado";
  //       } 
  //       this.mostrarError(mensaje);
  //     });
  // }

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
    alert(mensaje);
    // Toastify({
    //   text: mensaje,
    //   duration: 3000,
    //   position: 'center',
    //   className: 'text-mono',
    //   close: true,
    //   stopOnFocus: true,
    //   style: { color: "#701a28", background: "linear-gradient(to right, #ff8a9d, #ff8a9d)" }
    // }).showToast();
  }

}
