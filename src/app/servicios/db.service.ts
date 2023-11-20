import { Injectable } from '@angular/core';
import { 
  doc,
  where,
  query,
  setDoc,
  getDoc,
  getDocs,
  Firestore, 
  collection,
  collectionData
  } from '@angular/fire/firestore';

import { ArchivosService } from './archivos.service';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor( public fs: Firestore ) {}

  async agregarUsuario( uid, usuario ) {
    await setDoc(doc(this.fs, "usuarios", uid), usuario);
  }

  agregarEspecialidad( especialidad: string) {
    setDoc(doc(this.fs, "especialidades", especialidad), {nombre: especialidad});
  }

  // Devuelve la lista de todos los usuarios
  async obtenerUsuarios() {
    let usuariosResult = [];
    const usuariosRef = collection(this.fs, "usuarios");
    // this.usuarios$ = collectionData(usuariosRef) as Observable<Usuario[]>;

    const querySnapshot = await getDocs(usuariosRef);
    querySnapshot.forEach((doc) => {
      usuariosResult.push({
        rol: doc.data()['rol'],
        nombre: doc.data()['nombre'],
        apellido: doc.data()['apellido'],
        edad: doc.data()['edad'],
        dni: doc.data()['dni'],
        email: doc.data()['email'],
        obraSocial: doc.data()['obraSocial'],
        especialidad: doc.data()['especialidad'],
        habilitado: doc.data()['habilitado']
      });
    });

    return usuariosResult;
  }

  // Devuelve la lista de todos los usuarios con el rol indicado
  async obtenerUsuariosPorRol( rol ) {
    let usuariosResult = [];
    const usuariosRef = collection(this.fs, "usuarios");
    const q = query(usuariosRef, where("rol", "==", rol));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      usuariosResult.push({
        rol: doc.data()['rol'],
        nombre: doc.data()['nombre'],
        apellido: doc.data()['apellido'],
        edad: doc.data()['edad'],
        dni: doc.data()['dni'],
        email: doc.data()['email'],
        obraSocial: doc.data()['obraSocial'],
        especialidad: doc.data()['especialidad'],
        habilitado: doc.data()['habilitado']
      });
    });

    return usuariosResult;
  }

  // Devuelve la lista de todos los usuarios con el rol indicado
  async obtenerUsuarioPorUid( uid ) {

    let usuarioResult = null;
    const docRef = doc(this.fs, "usuarios", uid);
    const docSnap = await getDoc(docRef);

console.log('especialidad: '+docSnap.data()['especialidad']);

    usuarioResult = {
      rol: docSnap.data()['rol'],
      nombre: docSnap.data()['nombre'],
      apellido: docSnap.data()['apellido'],
      edad: docSnap.data()['edad'],
      dni: docSnap.data()['dni'],
      email: docSnap.data()['email'],
      obraSocial: docSnap.data()['obraSocial'],
      especialidad: docSnap.data()['especialidad'],
      habilitado: docSnap.data()['habilitado']
    }

    return usuarioResult;
  }

  // Devuelve la lista de todas las especialidades
  async obtenerEspecialidades() {
    let especialidadesResult = [];
    const especialidadesRef = collection(this.fs, "especialidades");

    const querySnapshot = await getDocs(especialidadesRef);
    querySnapshot.forEach((doc) => {
      especialidadesResult.push({
        nombre: doc.data()['nombre'],
      });
    });

    return especialidadesResult;
  }


}
