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
  mails :Mail[]=[];
  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.data.getData().subscribe( (data )=> {
      this.mails=data;
  this.data.mailLength.next(this.mails.length);
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

    onLoadMaildeitail(){
      this.router.navigate(['/child/mail-details']);
    }

}
