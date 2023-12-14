import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, addDoc, getDocs, orderBy } from '@angular/fire/firestore';

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

  // Devuelve la lista de todos los logs, en orden ascendente por fecha
  async obtenerTodos() {
    let logsResult = [];
    const logsRef = collection(this.fs, "logs");
    const q = query(logsRef, orderBy('fecha'));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      logsResult.push({
        fecha: doc.data().fecha.toDate(),
        actividad: doc.data().actividad,
        usuario: doc.data().usuario,
      });
    });

    return logsResult;
  }

}
