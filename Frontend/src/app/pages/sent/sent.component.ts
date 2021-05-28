import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mail } from 'src/app/shared/components/mail/mail.model';
import { EmailsService } from 'src/app/shared/services/emails.service';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  public mails :Mail;

  constructor(private router: Router,private email:EmailsService) { }

  ngOnInit(): void {

  this.email.getFrom().subscribe(res=>{
    this.mails = res;
  })
  }


  onLoadMaildeitail(id){
    this.router.navigate(['/child/mail-details',id]);
  }
}
