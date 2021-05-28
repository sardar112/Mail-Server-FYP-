import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Mail } from '../components/mail/mail.model';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {


 public mailLength=new BehaviorSubject(0);
 public searchEmailText=new BehaviorSubject('');

  constructor( private http : HttpClient) { }
   getFrom(){

   // return this.http.get<Mail>("http://localhost:3000/api/mail/from");
    return this.http.get<Mail>("http://68.183.107.82:3000/api/mail/from");


   }

   emailTo(){

    // return this.http.get<Mail>("http://localhost:3000/api/mail/from");
     return this.http.get<Mail>("http://68.183.107.82:3000/api/mail/to");
 
 
     }

   getSingleEmail(id){

   // return this.http.get<any>("http://localhost:3000/api/mail/single/"+id);
    return this.http.get<any>("http://68.183.107.82:3000/api/mail/single/"+id);


   }
   //all Emails
   getAllEmails(){

    // return this.http.get<Mail>("http://localhost:3000/api/mail/from");
     return this.http.get<Mail>("http://68.183.107.82:3000/api/mail/all");
 
 
    }
    //searchEmail
 searchEmail(text){
   return this.http.post<Mail>("http://68.183.107.82:3000/api/mail/search",text)
 }

 
 deleteEmail(id){
  return this.http.delete<Mail>("http://68.183.107.82:3000/api/mail/delete/"+id);
}


}
