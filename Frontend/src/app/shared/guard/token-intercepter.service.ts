import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor{

  constructor(private auth : LoginService) { }
  intercept(req : HttpRequest<any>, next : HttpHandler){
 if(this.auth.getToken()){ 
    const token = this.auth.getToken();
    req = req.clone({
      setHeaders: { token }
  });
  console.log(req);
}
  return next.handle(req);

  }

}
