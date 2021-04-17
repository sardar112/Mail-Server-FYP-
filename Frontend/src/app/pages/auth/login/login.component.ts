import { Component, OnInit } from '@angular/core';
import { error } from '@angular/compiler/src/util';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import {LoginService} from '../../../shared/services/login.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error : String;
  message : String;
  token:String;
   

  constructor(private loginService: LoginService, private fb : FormBuilder,private router: Router) { }

 loginForm : FormGroup;

  get email(){
    return this.loginForm.get('email')
  }
  
  get password(){
    return this.loginForm.get('password')
     
  }
  // isValid(){
  //   return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched
  // }
  ngOnInit(): void {

    this.loginForm = this.fb.group({

    email: ['', Validators.required],
    password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(255)]]

    })
  }

  onSubmit() {
    this.loginService.loginUser(this.loginForm.value).subscribe((res) => {
      if(res.error){
      this.error = res.message;
      }
      else{
 
        this.message= res.message;
       localStorage.setItem("token",res.data.toString());
        this.router.navigate(['child/mail']);
      }
    })
    
      
    }
 
//register routes
   register() {
    this.router.navigate(['resgister']);
  }
//email rout for reset password
  Email() {
    this.router.navigate(['email']);
  }



}
