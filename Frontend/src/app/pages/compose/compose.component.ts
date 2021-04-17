import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ComposeService} from '../../shared/services/compose.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
 
  error : String;
  message : String;
  Composed : boolean = true;
  
  

  constructor(private compose : ComposeService,private fb: FormBuilder) { }
  composeForm : FormGroup;
  get  to(){
    return this.composeForm.get('to')
  }
  get  subject(){
    return this.composeForm.get('subject')
  }
  get  content(){
    return this.composeForm.get('content')
  }
  
  ngOnInit(): void {
    this.compose.allowCompose.subscribe((Allow)=>{
      this.Composed = Allow;
    });
 // form ....................................
    this.composeForm=this.fb.group({

      to: ['', Validators.required],
      subject: [''],
      content: [''],

    })

  }

onSubmitCompose(){
 
  this.compose.submitEmail(this.composeForm.value).subscribe(res=>
    {
      if(res.error){
        this.error=res.message;
      }else{
        this.message=res.message;
        console.log(this.message)
      }
      

    })

}


  closeCompose(){
    this.Composed = false;
  }



}

     