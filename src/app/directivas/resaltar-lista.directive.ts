import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResaltarLista]'
})
export class ResaltarListaDirective {

  constructor( private el: ElementRef ) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.classList.toggle('bg-info');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.classList.toggle('bg-info');
  }

}
