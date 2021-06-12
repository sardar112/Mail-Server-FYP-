import { AfterViewInit, Component,  ElementRef,  OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ComposeService} from '../../shared/services/compose.service';
import  ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { EmailsService } from 'src/app/shared/services/emails.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit ,AfterViewInit{
  public Editor = ClassicEditor;
  public data: any;
  error : String;
  message : String;
  Composed : boolean = true;
  composeForm : FormGroup;
  selectedFile:any[]=[];
  showSpinner : boolean = false;
  constructor(private compose : ComposeService,
    private fb: FormBuilder ,
     private toast: ToastrService,
     private http: HttpClient,
     private email: EmailsService
     ) {
    
    this.composeForm=this.fb.group({

      to: ['', Validators.required],
      subject: [''],
      description:[ ''],
      files:[ ''],


    });
   }
  ngAfterViewInit(): void {
   // console.log(this.subject.nativeElement.value);


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
    
    for(var i=0; i < event.target.files.length; i++){
      this.selectedFile.push(event.target.files[i]);
      console.log(event.target.files[i]);
    }

  }

onSubmitCompose(e){
  let values = this.composeForm.value;
  const formdata = new FormData();
  Object.keys(values).forEach(key => {
    formdata.append(key, values[key]);
  });
  console.log(this.selectedFile)
  for(var i=0; i < this.selectedFile.length; i++){
   formdata.append("files",this.selectedFile[i]);
}

console.log(formdata);
 e.preventDefault();
 console.log(this.composeForm.value);
 console.log(this.composeForm.value.subject)

  this.compose.submitEmail(formdata).subscribe(res=>
  //   this.compose.submitEmail(this.composeForm.value).subscribe(res=>

    {
      if(res.error){
     this.toast.error(res.message.toString(),"Error");
      }else{
        this.toast.success(res.message.toString(),"Success");

        //console.log(this.message)
        this.composeForm.reset();
        this.Composed= false;
      }
      

     })

// }

}
  closeCompose(){
    this.Composed = false;
  }
  
  


oneEnterSubject(){
  this.showSpinner=true;
  // this.http.post<String>("http://127.0.0.1:5000/api",{subject:this.composeForm.value.subject}).subscribe(res => {
     
    //  document.getElementById("description").innerHTML = res.toString()
   // this.Editor.instances['ckeditor'].setData(res.toString());

  // this.Editor.
  //  this.data=res.toString();
 this.email.searchSubject(this.composeForm.value.subject).subscribe(res=>{
   console.log(this.composeForm.value.subject);

  // this.data=res.data

   this.showSpinner=false;
  // this.data=res.data.
  let temp=res.data.find((data)=>{

    return data.description.includes(this.composeForm.value.subject)
   })
   this.composeForm.get('description').setValue(temp?temp.description:"")
   



})
}}
    