import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {ForgotPasswordService} from '../../../shared/services/forgot-password.service';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  constructor(private fb: FormBuilder, private forgot : ForgotPasswordService , private toast : ToastrService) { }
  error : String;
  message : String;

  
  emailForm : FormGroup;

  get  recovery_email(){
    return this.emailForm.get('recovery_email')
  }
  ngOnInit(): void {
    
    this.emailForm = this.fb.group({

      recovery_email: ['', Validators.required],
 
  
      })
    }
    onSave(){
      this.forgot.forgotPassword(this.emailForm.value).subscribe(res => {

        if(res.error){
           this.toast.error(res.message.toString(),"Error");
        }else{
          this.toast.success(res.message.toString(),"Success");
        }
      })
      
    }
  }

