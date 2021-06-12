import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{email} from '../../pages/auth/email/email.model'
import{resetPassword} from '../../pages/auth/reset-password/reset.model';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  forgotPassword(email){
 // return this.http.post<email>("http://localhost:3000/api/forgot-password",email);
  return this.http.post<email>("http://162.243.166.89:3000/api/forgotPassword",email);

  }

  
  resetPassword(token,password){
   // return this.http.put<resetPassword>("http://localhost:3000/api/forgot-password/"+token,password);
    return this.http.put<resetPassword>("http://162.243.166.89:3000/api/forgotPassword/"+token,password);


    }

}
