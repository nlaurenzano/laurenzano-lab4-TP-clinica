import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { AuthenticationService } from "../../servicios/authentication.service";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'turnos-lista',
  templateUrl: './turnos-lista.component.html',
  styleUrls: ['./turnos-lista.component.css']
})
export class TurnosListaComponent {

  @Input() lista;
  @Input() tipo;
  @Output() seleccionado = new EventEmitter<string>();

  @ViewChild('historiaModal') private listado: ElementRef;

  public turnos= [];
  public turnoSeleccionado = null;
  public horaActual = new Date();

  constructor( public authenticationService: AuthenticationService ) {}

  get esPaciente() {
    return this.authenticationService.usuario.rol == 'paciente';
  }

  set setTurno( turno ) {
    this.turnoSeleccionado = turno;
  }

  seleccionar() {
    this.seleccionado.emit(this.turnoSeleccionado);
  }

  seleccionarTurno( turno ) {
    this.seleccionado.emit(turno);
  }

  get esSolicitud() {
    return this.tipo == 'solicitud';
  }

  get esListado() {
    return this.tipo == 'listado';
  }

  get esHistoria() {
    return this.tipo == 'historia';
  }

  descargar() {
    const DATA = this.listado.nativeElement;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`historia_${new Date().toISOString()}.pdf`);
    });

  }


}
