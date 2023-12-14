import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

import { BarChart, BarChartOptions } from 'chartist';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnChanges {

  @Input() datos;

  chart;

  ngOnChanges(changes: SimpleChanges) {
    if ( this.datos != null ) {
      if ( changes.datos.previousValue != changes.datos.currentValue ) {
        this.datos.then((datos)=>{
          this.chart = new BarChart( '#chart', datos,
            { axisY: {onlyInteger:true}} );
        });
      }
    }
  }


}
