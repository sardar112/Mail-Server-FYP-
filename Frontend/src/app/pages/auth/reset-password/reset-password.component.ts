import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordService } from '../../../shared/services/forgot-password.service';
import { MustMatch} from '../../../shared/passValidator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  

  error : String;
  message : String;
  token : string;

  constructor(
    private router: Router, private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private reset : ForgotPasswordService, private toast: ToastrService
    ) { }

  resetForm : FormGroup;

  get password(){
    return this.resetForm.get('password')
  }
  
  get confirm_password(){
    return this.resetForm.get('confirm_password')
     
  }
  // isValid(){
  //   return this.resetForm.get(FormCont).invalid && this.resetForm.get(controlName).touched
  // }
  ngOnInit(): void {

    this.resetForm = this.fb.group({

      password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(255)]],

      confirm_password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(255)]]

    } ,{validator : MustMatch('password', 'confirm_password')});
   

    this.activatedRoute.params.subscribe(paramsId => {
      this.token = paramsId.token;
      
  });
  
  }
  save(){
    if(this.resetForm.valid){
    this.reset.resetPassword(this.token,this.resetForm.value).subscribe(res => {
      if(res.error){
        this.toast.error(res.message.toString(),"Error");
      }else{
        this.toast.success(res.message.toString(),"Success");
        this.router.navigate(['login']);
      }
    })
  }
  }



  

}
