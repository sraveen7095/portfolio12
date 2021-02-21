import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder,Validators  } from  '@angular/forms';
import{ContactService} from '../contact.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  projects: any = [];
  ContactForm:FormGroup;
  submitted=false;
  constructor(private httpClient: HttpClient,private formBuilder: FormBuilder,private contact : ContactService) { 
    this.createContactForm();
  }
  createContactForm(){
    this.ContactForm =this.formBuilder.group({
      Name: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
  
  get f() { return this.ContactForm.controls; }

  ngOnInit(){
    this.httpClient.get("assets/projects.json").subscribe(data =>{
     
      this.projects = data;
    })
  }
 
  onSubmit(FormData) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ContactForm.invalid) {
        return;
    }
    this.contact.PostMessage(FormData)
    .subscribe(response => {
    location.href = 'https://mailthis.to/confirm'
    console.log(response)
    }, error => {
    console.warn(error.responseText)
    console.log({ error })
    })
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(FormData))
}

}
