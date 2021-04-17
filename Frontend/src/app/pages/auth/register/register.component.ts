import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {RegisterService} from '../../../shared/services/register.service';
import {MustMatch} from '../../../shared/passValidator'

import {registerUser} from './register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {


  error : boolean;
  message : String;
  selectedFile : File;

  constructor( private register : RegisterService , private fb : FormBuilder,private router : Router) { }
  
  registerForm : FormGroup;

get first_name(){
  return this.registerForm.get('first_name')
}

get last_name(){
  return this.registerForm.get('last_name')
}
get email(){
  return this.registerForm.get('email')
}

get recovery_email(){
  return this.registerForm.get('recovery_email')
}

get password(){
  return this.registerForm.get('password')
}
get confirm_password(){
  return this.registerForm.get('confirm_password')
}

get phone_number(){
  return this.registerForm.get('phone_number')
}
get gender(){   
  return this.registerForm.get('gender')
}
get city(){
  return this.registerForm.get('city')
}

  ngOnInit(): void {
    
  this.registerForm = this.fb.group({
    first_name: ['',[ Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    last_name: ['',[ Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email: ['', Validators.required],
    recovery_email: ['', Validators.required],
    password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(255)]],
    confirm_password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(255)]],
    phone_number: ['', [Validators.required,Validators.minLength(11),Validators.maxLength(20)]],
    gender: ['' , Validators.required],
    city: ['', Validators.required],
    image: ['',Validators.required]

  },{validator : MustMatch('password','confirm_password')})
  
  }

  onFileSelect(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    let values = this.registerForm.value;
    const formdata = new FormData();
    Object.keys(values).forEach(key => {
      formdata.append(key, values[key]);
    });
    formdata.append("profile",this.selectedFile);


  this.register.registerUser(formdata).subscribe((res) => {
  //  console.log(res);
    if(res.error){
    this.message = res.message;
    console.log(res.error);
    }
    else{
      console.log(res.message);
      this.message= res.message;
      this.router.navigate(['login']);
    }
  })
  
    
  }  
 

  login(){
    this.router.navigate(['login']);
  }

//#################Cross field validation ################

}
