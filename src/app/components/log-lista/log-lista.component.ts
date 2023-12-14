import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-log-lista',
  templateUrl: './log-lista.component.html',
  styleUrls: ['./log-lista.component.css']
})
export class LogListaComponent {

  @Input() lista;

}
