import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mail } from 'src/app/shared/components/mail/mail.model';
import { EmailsService } from 'src/app/shared/services/emails.service';

@Component({
  selector: 'app-all-mails',
  templateUrl: './all-mails.component.html',
  styleUrls: ['./all-mails.component.css']
})
export class AllMailsComponent implements OnInit {
  public mails :Mail;

  constructor(private email: EmailsService,private router:Router) { }

  ngOnInit(): void {
    this.email.getAllEmails().subscribe(res=>{
      this.mails = res;
      console.log(res);
    })

}


onLoadMaildeitail(id){
  this.router.navigate(['/child/mail-details',id]);
}

}