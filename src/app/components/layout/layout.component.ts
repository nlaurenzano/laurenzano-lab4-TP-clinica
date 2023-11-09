import { Component } from '@angular/core';
import { AuthenticationService } from "../../servicios/authentication.service";

// export type NavItem = {
//   link: string;
//   activo: boolean;
//   etiqueta: string
// }

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  // @Input navItems: NavItem[] = [];

  constructor( public authenticationService: AuthenticationService ) { }


}
