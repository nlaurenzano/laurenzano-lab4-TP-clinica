import { Injectable } from '@angular/core';
import { 
  doc,
  where,
  query,
  limit,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  orderBy,
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
        rol: doc.data().rol,
        nombre: doc.data().nombre,
        apellido: doc.data().apellido,
        edad: doc.data().edad,
        dni: doc.data().dni,
        email: doc.data().email,
        obraSocial: doc.data().obraSocial,
        especialidad: doc.data().especialidad,
        habilitado: doc.data().habilitado
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
        rol: doc.data().rol,
        nombre: doc.data().nombre,
        apellido: doc.data().apellido,
        edad: doc.data().edad,
        dni: doc.data().dni,
        email: doc.data().email,
        clave: doc.data().clave,
        obraSocial: doc.data().obraSocial,
        especialidad: doc.data().especialidad,
        habilitado: doc.data().habilitado
      });
    });

    return usuariosResult;
  }

  // Devuelve la lista de todos los pacientes que el especialista atendió al menos una vez
  async obtenerPacientes( usuario ) {
    let usuariosResult = [];
    let turnosResult = [];
    const turnosRef = collection(this.fs, "turnos");
    const q = query(turnosRef, 
      where("especialista.email", "==", usuario.email), 
      where("estado", "==", 'finalizado'), 
      orderBy('paciente.email'));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if ( turnosResult.every((turnoEmail)=>{return turnoEmail!=doc.data().paciente.email}) ) {
        turnosResult.push( doc.data().paciente.email );
      }
    });

    turnosResult.forEach((turnoEmail)=>{
      this.obtenerUsuarioPorEmail(turnoEmail)
        .then((usuario)=>{
          usuariosResult.push(usuario);
        });
    });
    
    return usuariosResult;
  }

  // Devuelve el usuario con el uid indicado
  async obtenerUsuarioPorUid( uid ) {

    let usuarioResult = null;
    const docRef = doc(this.fs, "usuarios", uid);
    const docSnap = await getDoc(docRef);

    usuarioResult = {
      id: docSnap.id,
      rol: docSnap.data().rol,
      nombre: docSnap.data().nombre,
      apellido: docSnap.data().apellido,
      edad: docSnap.data().edad,
      dni: docSnap.data().dni,
      email: docSnap.data().email,
      obraSocial: docSnap.data().obraSocial,
      especialidad: docSnap.data().especialidad,
      habilitado: docSnap.data().habilitado
    }

    return usuarioResult;
  }

  // Devuelve el usuario con el email indicado
  async obtenerUsuarioPorEmail( email ) {
    let usuarioResult = null;
    const usuariosRef = collection(this.fs, "usuarios");
    const q = query(usuariosRef, where("email", "==", email), limit(1));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      usuarioResult = {
        id: doc.id,
        rol: doc.data().rol,
        nombre: doc.data().nombre,
        apellido: doc.data().apellido,
        edad: doc.data().edad,
        dni: doc.data().dni,
        email: doc.data().email,
        clave: doc.data().clave,
        obraSocial: doc.data().obraSocial,
        especialidad: doc.data().especialidad,
        habilitado: doc.data().habilitado
      };
    });

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
        nombre: doc.data().nombre,
      });
    });

    return especialidadesResult;
  }


  // ------------ TURNOS ------------

  // Crea un turno nuevo
  async crearTurno( turnoSolicitud ) {
    let turno = {
      horario: turnoSolicitud.horario,
      especialista: {
        email: turnoSolicitud.especialista.email,
        nombre: turnoSolicitud.especialista.nombre,
        apellido: turnoSolicitud.especialista.apellido
      },
      especialidad: turnoSolicitud.especialidad,
      paciente: {
        email: turnoSolicitud.paciente.email,
        nombre: turnoSolicitud.paciente.nombre,
        apellido: turnoSolicitud.paciente.apellido
      },
      estado: turnoSolicitud.estado
    };
    const turnosRef = collection(this.fs, "turnos");
    await addDoc( turnosRef, turno );
  }

  // Devuelve la lista de todos los turnos del paciente
  async obtenerTurnosPaciente( usuario ) {
    let turnosResult = [];
    const turnosRef = collection(this.fs, "turnos");
    let q = query(turnosRef, where("paciente.email", "==", usuario.email), orderBy('horario'));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      turnosResult.push({
        id: doc.id,
        horario: doc.data().horario.toDate(),
        especialista: doc.data().especialista,
        especialidad: doc.data().especialidad,
        paciente: doc.data().paciente,
        estado: doc.data().estado,
        comentario: doc.data().comentario,
        calificacion: doc.data().calificacion,
        encuesta: doc.data().encuesta,
        historia: doc.data().historia
      });
    });
    return turnosResult;
  }

  // Devuelve la lista de todos los turnos del paciente
  async obtenerTurnosEstadoRango( inicio, fin, estado ) {
    let turnosResult = [];
    const turnosRef = collection(this.fs, "turnos");
    let q = query(turnosRef, 
      where("horario", ">=", inicio), 
      where("horario", "<=", fin), 
      orderBy('horario'));

    if ( estado != '' ) {
      q = query(turnosRef, 
      where("estado", "==", estado), 
      where("horario", ">=", inicio), 
      where("horario", "<=", fin), 
      orderBy('horario'));      
    }

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      turnosResult.push({
        id: doc.id,
        horario: doc.data().horario.toDate(),
        especialista: doc.data().especialista,
        especialidad: doc.data().especialidad,
        paciente: doc.data().paciente,
        estado: doc.data().estado,
        comentario: doc.data().comentario,
        calificacion: doc.data().calificacion,
        encuesta: doc.data().encuesta,
        historia: doc.data().historia
      });
    });
    return turnosResult;
  }

  // Devuelve la lista con la cantidad indicada de turnos del paciente, en el estado indicado
  async obtenerTurnosPacienteEstadoCantidad( usuario, estado, cantidad ) {
    let turnosResult = [];
    const turnosRef = collection(this.fs, "turnos");
    let q = query(turnosRef, 
        where("paciente.email", "==", usuario.email), 
        where("estado", "==", estado), 
        orderBy('horario'));

    if ( cantidad > 0 ) {
      q = query(turnosRef, 
        where("paciente.email", "==", usuario.email), 
        where("estado", "==", estado), 
        orderBy('horario'), 
        limit(cantidad));
    }

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      turnosResult.push({
        id: doc.id,
        horario: doc.data().horario.toDate(),
        especialista: doc.data().especialista,
        especialidad: doc.data().especialidad,
        paciente: doc.data().paciente,
        estado: doc.data().estado,
        comentario: doc.data().comentario,
        calificacion: doc.data().calificacion,
        encuesta: doc.data().encuesta,
        historia: doc.data().historia
      });
    });
    return turnosResult;
  }

  // Devuelve la lista con la cantidad indicada de turnos del paciente, con el especialista y estado indicados
  async obtenerTurnosPacienteEspEstadoCantidad( usuario, especialista, estado, cantidad ) {
    let turnosResult = [];
    const turnosRef = collection(this.fs, "turnos");
    let q = query(turnosRef, 
        where("paciente.email", "==", usuario.email), 
        where("especialista.email", "==", especialista.email), 
        where("estado", "==", estado), 
        orderBy('horario'));

    if ( cantidad > 0 ) {
      q = query(turnosRef, 
        where("paciente.email", "==", usuario.email), 
        where("especialista.email", "==", especialista.email), 
        where("estado", "==", estado), 
        orderBy('horario'), 
        limit(cantidad));
    }

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      turnosResult.push({
        id: doc.id,
        horario: doc.data().horario.toDate(),
        especialista: doc.data().especialista,
        especialidad: doc.data().especialidad,
        paciente: doc.data().paciente,
        estado: doc.data().estado,
        comentario: doc.data().comentario,
        calificacion: doc.data().calificacion,
        encuesta: doc.data().encuesta,
        historia: doc.data().historia
      });
    });
    return turnosResult;
  }

  // Devuelve la lista de todos los turnos del paciente
  async obtenerTurnosEspecialista( usuario ) {
    let turnosResult = [];

    const turnosRef = collection(this.fs, "turnos");
    const q = query(turnosRef, where("especialista.email", "==", usuario.email), orderBy('horario'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      turnosResult.push({
        id: doc.id,
        horario: doc.data().horario.toDate(),
        especialista: doc.data().especialista,
        especialidad: doc.data().especialidad,
        paciente: doc.data().paciente,
        estado: doc.data().estado,
        comentario: doc.data().comentario,
        calificacion: doc.data().calificacion,
        encuesta: doc.data().encuesta,
        historia: doc.data().historia
      });
    });
    return turnosResult;
  }

  // Devuelve la lista de todos los turnos
  async obtenerTurnos() {
    let turnosResult = [];
    const turnosRef = collection(this.fs, "turnos");
    const q = query(turnosRef, orderBy('horario'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      turnosResult.push({
        id: doc.id,
        horario: doc.data().horario.toDate(),
        especialista: doc.data().especialista,
        especialidad: doc.data().especialidad,
        paciente: doc.data().paciente,
        estado: doc.data().estado,
        comentario: doc.data().comentario,
        calificacion: doc.data().calificacion,
        encuesta: doc.data().encuesta,
        historia: doc.data().historia
      });
    });

    return turnosResult;
  }

  
  // Devuelve la lista de todos los turnos existentes del paciente, para la especialidad y el especialista indicados
  async obtenerTurnosExistentes( paciente, especialista, especialidad ) {
    let turnosResult = [];
    const turnosRef = collection(this.fs, "turnos");
    const q = query(turnosRef, 
      where("paciente.email", "==", paciente.email), 
      where("especialista.email", "==", especialista.email), 
      where("especialidad", "==", especialidad));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      turnosResult.push({
        id: doc.id,
        horario: doc.data().horario.toDate(),
        especialista: doc.data().especialista,
        especialidad: doc.data().especialidad,
        paciente: doc.data().paciente,
        estado: doc.data().estado,
        comentario: doc.data().comentario,
        calificacion: doc.data().calificacion,
        encuesta: doc.data().encuesta,
        historia: doc.data().historia
      });
    });
    return turnosResult;
  }

  actualizarTurno( turno, info ) {
    let campos = null;

    if ( turno.historia == null) {
      campos = {
        estado: turno.estado,
        comentario: info.comentario,
        calificacion: info.calificacion,
        encuesta: info.encuesta
      };
    } else {
      campos = {
        estado: turno.estado,
        comentario: info.comentario,
        calificacion: info.calificacion,
        encuesta: info.encuesta,
        historia: turno.historia
      };
    }

    const docRef = doc(this.fs, "turnos", turno.id);
    updateDoc(docRef, campos);
  }


  


  // ------------ HORARIOS ------------

  // Devuelve un objeto con los horarios del especialista, para la especialidad indicada.
  // Si no encuentra resultados, devuelve NULL.
  async obtenerHorarios( especialista, especialidad ) {
    let horariosResult = null;
    const docRef = doc(this.fs, "horarios", especialista + '-' + especialidad);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      horariosResult = {
        horariosInicio: docSnap.data().horariosInicio,
        horariosFin: docSnap.data().horariosFin,
        duracion: docSnap.data().duracion
      }
    }

    return horariosResult;
  }

  guardarHorarios( especialista, especialidad, horarios ) {
    const docRef = doc(this.fs, "horarios", especialista + '-' + especialidad);
    setDoc(docRef, horarios);
  }


}
