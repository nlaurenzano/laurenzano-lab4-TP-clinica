import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../../servicios/authentication.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( public authenticationService: AuthenticationService, public router: Router ) {}

  ngOnInit() {
    this.authenticationService.signOut(true);
    this.router.navigate(['auth/login']);
  }
}
