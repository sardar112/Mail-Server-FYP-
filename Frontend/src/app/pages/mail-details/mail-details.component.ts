import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mail } from 'src/app/shared/components/mail/mail.model';
import { EmailsService } from 'src/app/shared/services/emails.service';

@Component({
  selector: 'app-mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.css']
})
export class MailDetailsComponent implements OnInit {
  id: String;
  public email: Mail;
  constructor(private  activatedRoute: ActivatedRoute,
    private emails:EmailsService , 
    private router:Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
     // console.log(this.id);
  });
  
  this.emails.getSingleEmail(this.id).subscribe(res => 
    {
      console.log(res);
       this.email = res.data;
       
       console.log(this.email);
    });
  }

  onDeleteEmail(){
this.emails.deleteEmail(this.id).subscribe(res => {
  console.log(res);
  if(res){
this.toast.success(res.message.toString(),"Success")
    this.router.navigate(['/child/mail']);
  }else{
  console.log (res.error)
  this.toast.error(res.message.toString(),"Error")

  }
})
  }


  getExtension(filename)
{
    var ext = filename.split('.').pop();
    if(ext == filename) return "";
    return ext;
}
imageExtension(path){
var extension =["jpg","png","gif","jpeg"];
return extension.includes(this.getExtension(path));
}

}
