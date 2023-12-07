import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { DbService } from "../../../servicios/db.service";

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit{

  @Input() especialista;
  @Input() especialidad;
  @Output() salir = new EventEmitter<string>();

  public horas = [];
  public horasSabado = [];
  public minutos = [0, 15, 30, 45];
  public minutosDuracion = [15, 30, 45];
  public dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

  // Lunes a viernes 8:00 a 19:00 y sábados de 8:00 a 14:00. Turnos de 30 muinutos.
  duracion:number = 30;
  horariosInicio = [
      {hora:0,min:0}, 
      {hora:8,min:0}, 
      {hora:8,min:0}, 
      {hora:8,min:0}, 
      {hora:8,min:0}, 
      {hora:8,min:0}, 
      {hora:8,min:0}
    ];
  horariosFin = [
      {hora:0,min:0}, 
      {hora:19,min:0}, 
      {hora:19,min:0}, 
      {hora:19,min:0}, 
      {hora:19,min:0}, 
      {hora:19,min:0}, 
      {hora:14,min:0}
    ];

  constructor( public db: DbService ) {}

  ngOnInit() {

    this.obtenerHorarios();

    // Genera las opciones de horas
    for ( let hora=8; hora<=19; hora++ ) {
      this.horas.push(hora);
      if ( hora <= 14 ) {
        this.horasSabado.push(hora);
      }
    }

    // Obtiene el horario existente.
    // Si no se encuentra, se usan los valores por defecto
    // TODO: const horarios = await this.db.obtenerHorarios( this.especialista, this.especialidad );
  }

  // Obtiene el horario existente.
  // Si no se encuentra, se usan los valores por defecto
  async obtenerHorarios() {
    const horarios = await this.db.obtenerHorarios( this.especialista.email, this.especialidad );
    // Si no hay resultados, se configuran los valores por defecto (para toda la semana)
    if ( horarios != null ) {
      this.horariosInicio = horarios.horariosInicio;
      this.horariosFin = horarios.horariosFin;
      this.duracion = horarios.duracion;
    }
  }

  // Guarda los datos y cierra el form
  cerrarConfiguracion() {
    let horarios = {
      horariosInicio: this.horariosInicio.map(
        (value) => {
          return {hora: +value.hora, min: +value.min};
        }),
      horariosFin: this.horariosFin.map(
        (value) => {
          return {hora: +value.hora, min: +value.min};
        }),
      duracion: +this.duracion
    }
    this.db.guardarHorarios( this.especialista.email, this.especialidad, horarios );
    this.salir.emit();
  }




}
