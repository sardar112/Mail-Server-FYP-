import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/services/data.service';
import { LoginService } from 'src/app/shared/services/login.service';
import {MustMatch} from '../../../shared/passValidator'
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  id: string;
  error : String;
  message : String;


  constructor( private updateUser : DataService,
     private fb : FormBuilder,
     private router : Router, private toast: ToastrService) { }
  editForm : FormGroup;

get first_name(){
  return this.editForm.get('first_name')
}

get last_name(){
  return this.editForm.get('last_name')
}
get recovery_email(){
  return this.editForm.get('recovery_email')
}
get password(){
  return this.editForm.get('password')
}
get confirm_password(){
  return this.editForm.get('confirm_password')
}

get phone_number(){
  return this.editForm.get('phone_number')
}
get gender(){
  return this.editForm.get('gender')
}
get city(){
  return this.editForm.get('city')
}

  ngOnInit(): void {
    
  this.editForm = this.fb.group({
    first_name: ['',[ Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
    last_name: ['',[ Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
    recovery_email: ['', Validators.required],
    password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(255)]],
    confirm_password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(255)]],
    phone_number: ['', [Validators.required,Validators.minLength(11),Validators.maxLength(20)]],
    gender: ['' , Validators.required],
    city: ['', Validators.required]

  },{validator : MustMatch('password','confirm_password')})
  
  }
  
   onUpdate(){
this.updateUser.updateUser(this.editForm.value).subscribe(res => {
if(res.error){
this.toast.error(res.message.toString(),"Error");
}else{
  this.toast.success(res.message.toString(),"Success");
  this.router.navigate(['settings']);

}

})
   }

}
