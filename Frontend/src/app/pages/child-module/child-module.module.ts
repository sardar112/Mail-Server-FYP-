import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule, Routes } from '@angular/router';
import { ChildModuleComponent } from './child-module.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AllMailsComponent } from '../all-mails/all-mails.component';
import { MailDetailsComponent } from '../mail-details/mail-details.component';
import { SentComponent } from '../sent/sent.component';
import { DraftComponent } from '../draft/draft.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { MailComponent } from '../../shared/components/mail/mail.component';
import { ComposeComponent } from '../compose/compose.component';
import {AuthGuard} from '../../shared/guard/auth.guard';
import { MaterialModule } from '../public/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const childRoutes : Routes = [

  { path : "child" , component : ChildModuleComponent,
  canActivate : [AuthGuard],
  children:[

    { path : "mail" , component : MailComponent }, 
    { path : "all-mails" , component : AllMailsComponent },
    { path : "sent" , component : SentComponent}, 
    { path : "draft" , component : DraftComponent},
    { path : "mail-details/:id" , component : MailDetailsComponent}, 

  

  ]}, 

  
];
  


@NgModule({
  declarations: [
    ChildModuleComponent,
    AllMailsComponent,
    MailDetailsComponent,
    SentComponent,
    DraftComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MailComponent,
    ComposeComponent,
  
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CKEditorModule,
    ReactiveFormsModule,
    FormsModule,

    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass:'inline',
      preventDuplicates: true,
      
    }),
    RouterModule.forChild(childRoutes),
  ]
})
export class ChildModuleModule { }
