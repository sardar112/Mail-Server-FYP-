import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { EmailsService } from 'src/app/shared/services/emails.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
public searchFrom: FormGroup;
  constructor( private router: Router , private login : LoginService, private email : EmailsService) { }
  
  logOut() {
  this.login.logout();
    this.router.navigate(['login']);
  
  }
  
  setting() {
  
    this.router.navigate(['settings']);
  
  }

  ngOnInit(): void {
    this.searchFrom=new FormGroup({

      search : new FormControl('')
   
     })

  }
onSearchEmail() {
 // console.log(this.searchFrom.value)
  this.email.searchEmailText.next(this.searchFrom.value);
}
}
