import { Component } from '@angular/core';

import { BarChart, BarChartOptions } from 'chartist';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent {

  public lista = [
    {id: 'ingresos', nombre: 'Log de ingresos al sistema'},
    {id: 'turnosEsp', nombre: 'Turnos por especialidad'},
    {id: 'turnosDia', nombre: 'Turnos por día'},
    {id: 'turnosSol', nombre: 'Turnos solicitados por médico'},
    {id: 'turnosFin', nombre: 'Turnos finalizados por médico'}];

  


}
