import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { RouterModule, Routes } from '@angular/router';
import{MaterialModule} from './material/material.module'

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from '../../pages/auth/register/register.component';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { SettingsComponent } from '../../pages/auth/settings/settings.component';
import { ResetPasswordComponent } from '../../pages/auth/reset-password/reset-password.component';
import { EditprofileComponent } from '../../pages/auth/editprofile/editprofile.component';
import { EmailComponent } from '../../pages/auth/email/email.component';
import {AuthGuard} from '../../shared/guard/auth.guard';



const publicRoutes : Routes = [

  { path : "" ,
  children : [
    { path : "" , component : HomeComponent},
    { path : "register" , component : RegisterComponent}, 
    { path : "login" , component : LoginComponent },
    { path : "reset-password/:token" , component : ResetPasswordComponent },
    { path : "settings" , component : SettingsComponent,  canActivate : [AuthGuard],}, 
    { path : "editprofile" , component : EditprofileComponent,  canActivate : [AuthGuard],}, 
    { path : "email" , component : EmailComponent}, 


  ] }, 
 

 
];


@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    SettingsComponent,
    ResetPasswordComponent,
    EditprofileComponent,
    EmailComponent,

  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass:'inline',
      preventDuplicates: true,
    }),
    RouterModule.forChild(publicRoutes),
  ],
  providers: [
   
  ],
})
export class PublicModule { }
