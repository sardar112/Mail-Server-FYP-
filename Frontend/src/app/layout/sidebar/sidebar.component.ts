import { Component, OnInit } from '@angular/core';

import {Router } from '@angular/router';
import { ComposeService } from 'src/app/shared/services/compose.service';
import { EmailsService } from 'src/app/shared/services/emails.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  totalMails :number;
  constructor(private router : Router , private email:EmailsService, private compose : ComposeService) { }
  showComposed(){
    this.compose.allowCompose.next(true);
  }
  

  ngOnInit(): void {
    this.email.mailLength.subscribe((length)=>{
      this.totalMails = length;
    }
    );

    
  }

  onLoadInbox(){
    this.router.navigate(['/child/mail']);
  }
  onLoadsent(){
    this.router.navigate(['/child/sent']);

  }

  onLoadallmail(){
    this.router.navigate(['/child/all-mails']);
  }
  
 
}
