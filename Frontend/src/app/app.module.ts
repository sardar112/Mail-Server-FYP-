import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { ChildModuleModule } from './pages/child-module/child-module.module';
import { PublicModule } from './pages/public/public.module';
import {TokenIntercepterService} from './shared/guard/token-intercepter.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './pages/public/material/material.module';








const appRoutes : Routes = [

 
  { path : "" , loadChildren:()=> import("./pages/public/public.module").then(mod => mod.PublicModule)}, 
  { path : "mails" ,loadChildren:()=> import("./pages/child-module/child-module.module").then(mod => mod.ChildModuleModule)}, 

];
  
    

@NgModule({
  declarations: [
    AppComponent,
 
  
   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ChildModuleModule ,
    PublicModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepterService,
      multi: true
    }
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
