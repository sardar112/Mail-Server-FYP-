import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { registerUser } from '../register/register.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

 public user : registerUser;
public error :String;
public message:String;
 public image :string;

  constructor(
    private router: Router,
    private data : DataService,
     private fb : FormBuilder,
     private toastr: ToastrService
     ) { }
  
 
  ngOnInit(): void {
     
    //.............................Getting user............................................
    this.data.getUser().subscribe((res)=> {
    //  console.log(res);
      if(res.error){
     this.error = res.message;
      }else{
     // this.toastr.success('Hello world!', 'Toastr fun!');

      this.message= res.message;
       this.user= res;
       this.image = 'http://localhost:3000/'+res.data.image
   // console.log(this.image);
      }
    })

  }



 
 updateAccount(){
   this.router.navigate(['editprofile']);
 }

 deleteAccount(){
   this.data.deleteUser().subscribe(res=> {
    if(res){

      localStorage.removeItem('token');
    this.router.navigate(['register']);
    }
    });
}


moveToProfile(){
  this.router.navigate(['profile']);
}



}
