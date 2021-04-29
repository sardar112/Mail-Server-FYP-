import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mail } from 'src/app/shared/components/mail/mail.model';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.css']
})
export class MailDetailsComponent implements OnInit {
  id: String;
  public email: any;
  constructor(private  activatedRoute: ActivatedRoute,private data:DataService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
      console.log(this.id);
  });
  
  this.data.getSingleEmail(this.id).subscribe(res => 
    {
      console.log(res);
       this.email = res.data;
       console.log(this.email);
    });
  }

}
