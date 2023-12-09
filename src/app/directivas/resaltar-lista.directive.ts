import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResaltarLista]'
})
export class ResaltarListaDirective {

  constructor( private el: ElementRef ) {}

  @HostListener('mouseenter') onMouseEnter() {
    // this.highlight('bg-info');
    this.el.nativeElement.classList.toggle('bg-info');
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this.highlight('');
    this.el.nativeElement.classList.toggle('bg-info');
  }

}
