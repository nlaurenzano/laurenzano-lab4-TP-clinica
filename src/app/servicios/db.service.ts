import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDocs, collection, collectionData } from '@angular/fire/firestore';
import { Usuario } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  public loadingUsuarios: boolean = false;
  public usuarios = [{nombre:''}];

  constructor( public fs: Firestore ) {}

  // Devuelve la lista de todos los usuarios
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

  agregarUsuario( usuario ) {
    console.log('agregarUsuario 1');
    const docData = {
      id: usuario.id,
      rol: usuario.rol,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      edad: usuario.edad,
      dni: usuario.dni,
      obraSocial: usuario.obraSocial,
      especialidad: usuario.especialidad
      // dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
    };
    console.log('agregarUsuario 2 '+docData.id);
    
    setDoc(doc(this.fs, "usuarios", usuario.id), docData);

    console.log('agregarUsuario 3');
  }


}
