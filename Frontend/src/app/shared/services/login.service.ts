import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {loginUser} from '../../pages/auth/login/login.model'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  error : String;
  message : String;

  
  //url= "http://localhost:3000/api/login";
  url= "http://162.243.166.89:3000/api/login";

  constructor( private http: HttpClient , private router: Router) { }
 
  loginUser(userData){

    return this.http.post<loginUser>(this.url, userData)
    
  }

  //getting the current user


  getToken() {
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    return (token !== null) ? true : false;
  }

  logout() {
    let removeToken = localStorage.removeItem('token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

}