import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc, getDocs, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { 
  Auth,
  // User,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile
  } from "@angular/fire/auth";

// import { LogService } from './log.service';
// import Toastify from 'toastify-js';


export interface Usuario {
  rol: string,
  nombre: string,
  apellido: string,
  edad: string,
  dni: string,
  email: string,
  clave: string,
  obraSocial: string,    // Pacientes
  especialidad: string,  // Especialistas
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loadingUsuarios: boolean = false;
  public usuarios = [{nombre:''}];

  constructor(
    public auth: Auth,
    public fs: Firestore,
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
  signUp( usuario: Usuario ) {

    createUserWithEmailAndPassword(this.auth, usuario.email, usuario.clave)
      .then((resultado) => {
        updateProfile(resultado.user, { displayName: usuario.nombre + ' ' + usuario.apellido});

        const docData = {
          // uid: resultado.user.uid,
          rol: usuario.rol,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          edad: usuario.edad,
          dni: usuario.dni,
          obraSocial: usuario.obraSocial,
          especialidad: usuario.especialidad
          // dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
        };
        setDoc(doc(this.fs, "usuarios", resultado.user.uid), docData);

        // .then(...)
        // .catch(...)
        
        console.log('nombre: '+resultado.user.displayName);

        // Log de registro
        // this.logService.signUp(email);
        // Redirección
        this.router.navigate(['/']);
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
        this.mostrarError(mensaje);
      });
  }

  // Devuelve la lista de todos los usuarios registrados
  async obtenerUsuarios() {

    this.loadingUsuarios = true;
    this.usuarios = [];
    const usuariosRef = collection(this.fs, "usuarios");
    // this.usuarios$ = collectionData(usuariosRef) as Observable<Usuario[]>;

    const querySnapshot = await getDocs(collection(this.fs, "usuarios"));
    querySnapshot.forEach((doc) => {
      this.usuarios.push({
        nombre: doc.data()['nombre']
      });
    });
    this.loadingUsuarios = false;
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
