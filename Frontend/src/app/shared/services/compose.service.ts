import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import{composeEmail} from '../../pages/compose/compose.model'


@Injectable({
  providedIn: 'root'
})
export class ComposeService {


  allowCompose = new BehaviorSubject(false);

  constructor(private http:HttpClient) { }

  submitEmail(data){
    
     return this.http.post<composeEmail>("http://68.183.107.82:3000/api/mail",data);
    // return this.http.post<composeEmail>("http://localhost:3000/api/mail",data);

  }

}
