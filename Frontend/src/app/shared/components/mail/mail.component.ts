import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ EmailsService} from '../../services/emails.service';
import {Mail} from './mail.model';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  public showIcons = false;
 public mails :Mail;
  public searchText;

  constructor(private email: EmailsService, private router: Router) { }

  ngOnInit(): void {
    this.email.searchEmailText.subscribe(res=> {
     // console.log(res);
       this.email.searchEmail(res).subscribe(emails => {
         this.mails=emails;
         console.log(emails);
       })
      
    //  this.searchText = res;
     // console.log(res)
    })
    this.email.emailTo().subscribe(res => {
  this.email.mailLength.next(res.data.length);
    this.mails=res;
     },
    err =>{
    console.log(err);
   
    });

    

  }
  over(){
    this.showIcons=true;
     }
   
    leave(){
      this.showIcons = false;
    }

    onLoadMaildeitail(id){
      this.router.navigate(['/child/mail-details',id]);
    }

// on_search_email(){
//   this.email.searchEmail(this.searchText).subscribe(emails => {
//    // this.mails=emails;
//     console.log(emails);
//   })
// }


}
