import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router , private login : LoginService) { }
  
  logOut() {
  this.login.logout();
    this.router.navigate(['login']);
  
  }
  
  setting() {
  
    this.router.navigate(['settings']);
  
  }

  ngOnInit(): void {

  }

}
