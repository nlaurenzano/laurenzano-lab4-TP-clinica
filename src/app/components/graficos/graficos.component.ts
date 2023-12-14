import { Component, OnInit, Input } from '@angular/core';

import { BarChart, BarChartOptions } from 'chartist';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  @Input() datos;

  ngOnInit() {

    new BarChart(
      '#chart',
      {
        labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        series: [20, 60, 120, 200, 180, 20, 10]
      },
      {
        distributeSeries: true
      }
    );

    // const data = {
    //   labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
    //   series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]]
    // };

    // const options: BarChartOptions = {
    //   high: 10,
    //   low: -10,
    //   axisX: {
    //     labelInterpolationFnc(value, index) {
    //       return index % 2 === 0 ? value : null;
    //     }
    //   }
    // };

    // new BarChart('#chart', data, options);

  }


}
