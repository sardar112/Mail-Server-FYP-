import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Mail} from '../components/mail/mail.model';
import { BehaviorSubject } from 'rxjs';
import { updateUser } from 'src/app/pages/auth/editprofile/updateUser.model';
import { registerUser } from 'src/app/pages/auth/register/register.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  mailLength=new BehaviorSubject(0);

  constructor( private http : HttpClient) { }
   getData(){

    return this.http.get<Mail[]>("http://localhost:3000/api/mails");

   }
   // update user
updateUser(updateData){

  return this.http.put<updateUser>("http://localhost:3000/api/getuser/edit",updateData)

}
// getting the user
getUser(){

  return this.http.get<registerUser>("http://localhost:3000/api/getuser")
  

}
// delete user
deleteUser(){

  return this.http.delete("http://localhost:3000/api/getuser")
  

}


}
