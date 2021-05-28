import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ComposeService} from '../../shared/services/compose.service';
import  ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
  public Editor = ClassicEditor;
  error : String;
  message : String;
  Composed : boolean = true;
  composeForm : FormGroup;
  selectedFile:string[]=[];
  

  constructor(private compose : ComposeService,private fb: FormBuilder) {
    
    this.composeForm=this.fb.group({

      to: ['', Validators.required],
      subject: [''],
      description:[ ''],
      files:[ ''],


    });
   }
  
  // get  to(){
  //   return this.composeForm.get('to')
  // }
  // get  subject(){
  //   return this.composeForm.get('subject')
  // }
  // get  description(){
  //   return this.composeForm.get('description')
  // }
  
  ngOnInit(): void {
    this.compose.allowCompose.subscribe((Allow)=>{
      this.Composed = Allow;
    
    });
 // form ....................................
    

  };

  onFileSelect(event){

    for(var i=0; i < event.terget.files.length; i++){
      this.selectedFile.push(event.terget.files[i]);
    }

  }

onSubmitCompose(e){
  // let values = this.composeForm.value;
  // const formdata = new FormData();
  // Object.keys(values).forEach(key => {
  //   formdata.append(key, values[key]);
  // });
  for(var i=0; i < this.selectedFile.length; i++){
  // formdata.append("files",this.selectedFile[i]);
}


 // e.preventDefault();
 // console.log(this.composeForm.value);
 
  this.compose.submitEmail(this.composeForm.value).subscribe(res=>
    // if(res)
    // console.log(res));
    {
      if(res.error){
      alert(this.error=res.message);
      }else{
       alert( this.message=res.message);
        console.log(this.message)
      }
      

     })

// }

}
  closeCompose(){
    this.Composed = false;
  }



}

     