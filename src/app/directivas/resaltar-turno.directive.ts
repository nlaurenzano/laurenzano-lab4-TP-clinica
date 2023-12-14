import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResaltarTurno]'
})
export class ResaltarTurnoDirective {

  constructor( private el: ElementRef ) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.classList.toggle('resaltar-algo');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.classList.toggle('resaltar-algo');
  }

}
