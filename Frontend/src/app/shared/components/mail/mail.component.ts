import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ DataService} from '../../services/data.service';
import {Mail} from './mail.model';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  public showIcons = false;
 public mails :Mail;
 // public mails :any[]=[];

  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.data.getData().subscribe(res => {
  this.data.mailLength.next(res.data.length);
    this.mails=res;
 console.log(this.mails)
//     this.mails= res.map(d=>{
//         to:d.to;
//         from:d.from;
//         subject:d.subject;

        

//       });
//       console.log(data);
    
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

}
