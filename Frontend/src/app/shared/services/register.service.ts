import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {registerUser} from '../../pages/auth/register/register.model'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


   url= "http://localhost:3000/api/register";

  constructor( private http: HttpClient) { }
 
   registerUser(userData){

     return this.http.post<registerUser>(this.url, userData);
     
   }
}
     