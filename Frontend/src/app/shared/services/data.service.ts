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


  constructor( private http : HttpClient) { }
  
   // update user
updateUser(updateData){

 // return this.http.put<updateUser>("http://localhost:3000/api/getuser/edit",updateData)
  return this.http.put<updateUser>("http://68.183.107.82:3000/api/getuser/edit",updateData)


}
// getting the user
getUser(){

  //return this.http.get<registerUser>("http://localhost:3000/api/getuser")
  return this.http.get<registerUser>("http://68.183.107.82:3000/api/getuser")

  

}
// delete user
deleteUser(){

  //return this.http.delete("http://localhost:3000/api/getuser")
  return this.http.delete(`http://68.183.107.82:3000/api/getuser`)

  

}


}
