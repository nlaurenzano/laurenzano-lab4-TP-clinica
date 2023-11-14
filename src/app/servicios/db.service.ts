import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDocs, collection, collectionData } from '@angular/fire/firestore';
import { Usuario } from './authentication.service';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor( public fs: Firestore ) {}

  // Devuelve la lista de todos los usuarios
  async obtenerUsuarios() {
    let usuariosResult = [];
    const usuariosRef = collection(this.fs, "usuarios");
    // this.usuarios$ = collectionData(usuariosRef) as Observable<Usuario[]>;

    const querySnapshot = await getDocs(collection(this.fs, "usuarios"));
    querySnapshot.forEach((doc) => {
      usuariosResult.push({
        rol: doc.data()['rol'],
        nombre: doc.data()['nombre'],
        apellido: doc.data()['apellido'],
        edad: doc.data()['edad'],
        dni: doc.data()['dni'],
        obraSocial: doc.data()['obraSocial'],
        especialidad: doc.data()['especialidad']
      });
    });

    return usuariosResult;
  }

  agregarUsuario( uid, usuario ) {
    const docData = {
      rol: usuario.rol,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      edad: usuario.edad,
      dni: usuario.dni,
      obraSocial: usuario.obraSocial,
      especialidad: usuario.especialidad
      // dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
    };

    setDoc(doc(this.fs, "usuarios", uid), docData);
  }


}
