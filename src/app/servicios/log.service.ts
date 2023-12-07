import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private logs = collection(this.fs, 'logs');

  constructor( public fs: Firestore ) { }

  log(actividad: string, usuario) {
    const fecha = new Date();
    
    addDoc( this.logs, {
          fecha: fecha,
          actividad: actividad,
          usuario: {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email
          }
        });
  }

  signIn(usuario) {
    this.log("ingreso", usuario);
  }

  signOut(usuario) {
    this.log("salida", usuario);
  }

  signUp(usuario) {
    this.log("registro", usuario);
  }
}
