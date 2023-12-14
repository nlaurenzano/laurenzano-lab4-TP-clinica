import { Component, ElementRef, ViewChild } from '@angular/core';
import { TitleCasePipe, DatePipe } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { NombreUsuarioPipe } from '../../../pipes/nombre-usuario.pipe';
import { LogService } from '../../../servicios/log.service';
import { DbService } from "../../../servicios/db.service";

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent {

  @ViewChild('graficoInforme') private grafico: ElementRef;
  // @ViewChild('chart') private grafico: ElementRef;

  public datosInforme;
  public inicioInforme;
  public finInforme;

  public lista = [
    {id: 'ingresos', nombre: 'Log de ingresos al sistema'},
    {id: 'turnosEsp', nombre: 'Turnos por especialidad'},
    {id: 'turnosDia', nombre: 'Turnos por día'},
    {id: 'turnosSol', nombre: 'Turnos solicitados por médico'},
    {id: 'turnosFin', nombre: 'Turnos finalizados por médico'}];

  private informeSeleccionado = {id:'',nombre:''};

  constructor( private log: LogService, 
    private db: DbService, 
    private titlePipe: TitleCasePipe, 
    private datePipe: DatePipe, 
    private nombreUsuarioPipe: NombreUsuarioPipe ) {}

  get esIngresos() {
    return this.informeSeleccionado.id == 'ingresos';
  }

  get usaFechas() {
    return this.informeSeleccionado.id == 'turnosSol' || this.informeSeleccionado.id == 'turnosFin';
  }

  seleccionarInforme( informe ) {
    this.informeSeleccionado = informe;
    let fin;
    let inicio;

    switch (informe.id) {
      case 'ingresos':
        this.datosInforme = this.log.obtenerTodos();

      break;
      
      case 'turnosEsp':
        this.datosInforme = this.db.obtenerTurnos()
          .then((turnos)=>{
            return this.armarTurnosPorEspecialidad(turnos);
          });
      break;
      
      case 'turnosDia':
        this.datosInforme = this.db.obtenerTurnos()
          .then((turnos)=>{
            return this.armarTurnosPorDia(turnos);
          });

      break;
      
      case 'turnosSol':
        this.finInforme = new Date();
        this.finInforme.setDate( this.finInforme.getDate() + 15 );
        this.inicioInforme = new Date();

        this.datosInforme = this.db.obtenerTurnosEstadoRango(this.inicioInforme, this.finInforme, '')
          .then((turnos)=>{
            return this.armarTurnosPorEspecialista(turnos);
          });

      break;

      case 'turnosFin':
        this.finInforme = new Date();
        this.inicioInforme = new Date();
        this.inicioInforme.setDate( this.inicioInforme.getDate() - 30 );

        this.datosInforme = this.db.obtenerTurnosEstadoRango(this.inicioInforme, this.finInforme, 'finalizado')
          .then((turnos)=>{
            return this.armarTurnosPorEspecialista(turnos);
          });

      break;

    }
  }

  // Devuelve los datos para el gráfico
  // labels: lista de especialidades
  // seres: lista de cantidad de turnos
  private armarTurnosPorEspecialidad( turnos ) {
    let datosResult = {
      labels: [],
      series: [[]]
    };

    turnos.forEach((turno)=>{
      // Completo la lista de especialidades
      let especialidad = this.titlePipe.transform(turno.especialidad);
      if ( !datosResult.labels.includes(especialidad) ) {
        datosResult.labels.push(especialidad);

        // Inicializo el contador de turnos para esta especialidad
        datosResult.series[0].push(1);

      } else {
        // Incremento el contador de turnos para esta especialidad
        const i = datosResult.labels.indexOf(especialidad);
        datosResult.series[0][i]++;
      }
    });

    return datosResult;
  }

  // Devuelve los datos para el gráfico
  // labels: lista de días
  // seres: lista de cantidad de turnos
  private armarTurnosPorDia( turnos ) {
    let datosResult = {
      labels: [],
      series: [[]]
    };

    turnos.forEach((turno)=>{
      // Completo la lista de días

      const horario = new Date(turno.horario.toString());
      const dia = horario.getDate() + '/' + horario.getMonth() + '/' + horario.getFullYear()

      if ( !datosResult.labels.includes(dia) ) {
        datosResult.labels.push(dia);

        // Inicializo el contador de turnos para esta especialidad
        datosResult.series[0].push(1);

      } else {
        // Incremento el contador de turnos para esta especialidad
        const i = datosResult.labels.indexOf(dia);
        datosResult.series[0][i]++;
      }
    });

    return datosResult;
  }

  // Devuelve los datos para el gráfico
  // labels: lista de especialistas
  // seres: lista de cantidad de turnos
  private armarTurnosPorEspecialista( turnos ) {
    let datosResult = {
      labels: [],
      series: [[]]
    };

    turnos.forEach((turno)=>{
      // Completo la lista de especialistas
      let especialista = this.nombreUsuarioPipe.transform(turno.especialista);
      if ( !datosResult.labels.includes(especialista) ) {
        datosResult.labels.push(especialista);

        // Inicializo el contador de turnos para esta especialista
        datosResult.series[0].push(1);

      } else {
        // Incremento el contador de turnos para esta especialista
        const i = datosResult.labels.indexOf(especialista);
        datosResult.series[0][i]++;
      }
    });

    return datosResult;
  }


  descargar() {
    const DATA = this.grafico.nativeElement;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };

    doc.html(DATA);

    doc.save(`informe_${this.informeSeleccionado.id}_${new Date().toISOString()}.pdf`);




// addSvg(SVG-Data, x, y, width, height)
// addSvgAsImage(SVG-Data,        x, y, width, height, alias, compression, rotation)
// addImage(imageData, format,    x, y, width, height, alias, compression, rotation)

    // html2canvas(DATA, options).then((canvas) => {

    //   const img = canvas.toDataURL('image/PNG');

    //   // Add image Canvas to PDF
    //   const bufferX = 15;
    //   const bufferY = 15;
    //   const imgProps = (doc as any).getImageProperties(img);
    //   const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    //   // doc.addSvgAsImage(DATA.innerHTML, bufferX, bufferY, pdfWidth, pdfHeight);
    //   // doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, undefined, 0);
    //   doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight);

    //   return doc;
    // }).then((docResult) => {
    //   docResult.save(`informe_${this.informeSeleccionado.id}_${new Date().toISOString()}.pdf`);
    // });

  }

  public savePDF(): void {
    let content = this.grafico.nativeElement;
    let doc = new jsPDF();
  
    doc.setFontSize(14);
    doc.text(this.informeSeleccionado.nombre, 10, 20);
    doc.setFontSize(12);

    this.datosInforme.then((lista)=>{
      let y = 30
      lista.forEach((item)=>{
        if ( y > 270 ) {
          doc.addPage();
          y = 30;
        } else {
          y+= (10);
        }

        // doc.text(this.titlePipe.transform(item.usuario.nombre) + ' ' + this.titlePipe.transform(item.usuario.apellido) + ': ' + 
        doc.text(this.nombreUsuarioPipe.transform(item.usuario) + ': ' + 
          item.actividad + ' - ' + 
          this.datePipe.transform(item.fecha, 'dd-LL-yyyy HH:mm'),
          15, y );
      });
      doc.save(`informe_${this.informeSeleccionado.id}_${new Date().toISOString()}.pdf`);
    });
  }

}
