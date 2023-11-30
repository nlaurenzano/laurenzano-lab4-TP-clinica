import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

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

  horasInicio = [0, 8, 8, 8, 8, 8, 8];
  minutosInicio = [0, 0, 0, 0, 0, 0, 0];
  horasFin = [0, 19, 19, 19, 19, 19, 14];
  minutosFin = [0, 0, 0, 0, 0, 0, 0];

  horariosInicio = [0, 8, 8, 8, 8, 8, 8];
  horariosFin = [0, 19, 19, 19, 19, 19, 14];

  ngOnInit() {
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



  cerrarConfiguracion() {
    this.salir.emit();
  }
}
