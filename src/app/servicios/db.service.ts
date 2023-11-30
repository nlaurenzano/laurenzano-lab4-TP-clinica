import { Injectable } from '@angular/core';
import { 
  doc,
  where,
  query,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp,
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

  // ------------ USUARIOS ------------

  agregarUsuario( uid, usuario ) {
    return setDoc(doc(this.fs, "usuarios", uid), usuario);
  }

  // Devuelve la lista de todos los usuarios
  async obtenerUsuarios() {
    let usuariosResult = [];
    const usuariosRef = collection(this.fs, "usuarios");

    const querySnapshot = await getDocs(usuariosRef);
    querySnapshot.forEach((doc) => {
      usuariosResult.push({
        id: doc.id,
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
  async obtenerUsuariosPorRol( rol: string ) {
    let usuariosResult = [];
    const usuariosRef = collection(this.fs, "usuarios");
    const q = query(usuariosRef, where("rol", "==", rol));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      usuariosResult.push({
        id: doc.id,
        rol: doc.data()['rol'],
        nombre: doc.data()['nombre'],
        apellido: doc.data()['apellido'],
        edad: doc.data()['edad'],
        dni: doc.data()['dni'],
        email: doc.data()['email'],
        clave: doc.data()['clave'],
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

    usuarioResult = {
      id: docSnap.id,
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

  habilitarUsuario( uid: string, valor: boolean ) {
    const usuarioRef = doc(this.fs, "usuarios", uid);
    updateDoc(usuarioRef, {habilitado: valor});
  }


  // ------------ ESPECIALIDADES ------------

  agregarEspecialidad( especialidad: string) {
    setDoc(doc(this.fs, "especialidades", especialidad), {nombre: especialidad});
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


  // ------------ TURNOS ------------

  // Crea un turno nuevo
  async crearTurno( turno ) {
    // turno.horario = Timestamp.fromDate(turno.horario);

    const turnosRef = collection(this.fs, "turnos");
    await addDoc( turnosRef, turno );
  }

  // Devuelve la lista de todos los turnos
  async obtenerTurnosUsuario( usuario ) {
    let turnosResult = [];

    const turnosRef = collection(this.fs, "turnos");
    const q = query(turnosRef, where("paciente", "==", usuario.email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      turnosResult.push({
        horario: doc.data()['horario'].toDate(),
        especialista: doc.data()['especialista'],
        especialidad: doc.data()['especialidad'],
        paciente: doc.data()['paciente'],
        estado: doc.data()['estado'],
        comentario: doc.data()['comentario'],
        calificacion: doc.data()['calificacion'],
        encuesta: doc.data()['encuesta']
      });
    });

    return turnosResult;
  }

  // Devuelve la lista de todos los turnos
  async obtenerTurnos() {
    let turnosResult = [];
    const turnosRef = collection(this.fs, "turnos");

    const querySnapshot = await getDocs(turnosRef);

    querySnapshot.forEach((doc) => {
      turnosResult.push({
        horario: doc.data()['horario'].toDate(),
        especialista: doc.data()['especialista'],
        especialidad: doc.data()['especialidad'],
        paciente: doc.data()['paciente'],
        estado: doc.data()['estado'],
        comentario: doc.data()['comentario'],
        calificacion: doc.data()['calificacion'],
        encuesta: doc.data()['encuesta']
      });
    });

    return turnosResult;
  }

  
  // Devuelve la lista de todos los turnos existentes del paciente, para la especialidad y el especialista indicados
  async obtenerTurnosExistentes( paciente, especialista, especialidad ) {
    let turnosResult = [];
    const turnosRef = collection(this.fs, "turnos");
    const q = query(turnosRef, 
      where("paciente", "==", paciente), 
      where("especialista", "==", especialista), 
      where("especialidad", "==", especialidad));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      turnosResult.push({
        horario: doc.data()['horario'].toDate(),
        especialista: doc.data()['especialista'],
        especialidad: doc.data()['especialidad'],
        paciente: doc.data()['paciente'],
        estado: doc.data()['estado'],
        comentario: doc.data()['comentario'],
        calificacion: doc.data()['calificacion'],
        encuesta: doc.data()['encuesta']
      });
    });
    return turnosResult;
  }


  // ------------ HORARIOS ------------

  // Devuelve un objeto con los horarios del especialista, para la especialidad indicada.
  // Si no encuentra resultados, devuelve NULL.
  async obtenerHorarios( especialista, especialidad ) {

    let horariosResult = null;
    const docRef = doc(this.fs, "horarios", especialista + '-' + especialidad);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      horariosResult = {
        horariosInicio: docSnap.data().horariosInicio,
        horariosFin: docSnap.data().horariosFin,
        duracion: docSnap.data().duracion
      }
    } else {
      console.log("No such document!");
    }

    return horariosResult;
  }


}
