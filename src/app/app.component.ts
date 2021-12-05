import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, AsyncValidatorFn, ValidatorFn, AbstractControl} from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  surveyForm!: FormGroup;
  submitted= false;
  http: any;
  
  // constructor(private http:HttpClient){}
  constructor(private  formBuilder: FormBuilder, http: HttpClient){}

  
  //reg = '(https?://)?([\\da-z.-]+)\\(.|:)([a-z.]{2,6})[/\\w .-@$#%&]*/?';

  ngOnInit(){
    //const reg = '(https?://)?([\\da-z.-]+)\\(.|:)([a-z.]{2,6})[/\\w .-@$#%&]*/?';
    this.surveyForm = this.formBuilder.group({
      fName: ['',[Validators.required, Validators.pattern(/^[a-zA-Z ]{2,30}$/)]],
      lName: ['',[Validators.required, Validators.pattern(/^[a-zA-Z ]{2,30}$/)]],
      id: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{1,1}\d{8,8}$/)]],
      address: ['', [Validators.required, Validators.pattern(/^(?:[0-9]+\s[a-zA-Z]|[A-Za-z]+\s[0-9])[a-z0-9\s]*$/)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]*$/)]],
      state: ['',[Validators.required, Validators.pattern(/(^[a-zA-Z]{2,2})*$/)]],
      Zip: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern(/^[0-9]*$/)]],
      Telephone: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]{10,10}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      Url: [''],
      dos: ['', Validators.required],
      orders: new FormArray([]),
      comments: [],
      recommendation: ['', Validators.required],
      interest: [null, [Validators.required]],
      data: new FormArray([])
      
      //Date: ['',[Validators.required]]
    });    
  }
  
  //name = new FormControl('');
  get f() { return this.surveyForm.controls; }

  onSubmit(data: any) {
    this.submitted = true;
    
    
    // stop here if form is invalid
    if (this.surveyForm.invalid) {
        alert('invalid details');
    }
      else
    // display form values on success
    this.http.post('http://localhost:8043/restapp/rest/students/create', data);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.surveyForm.value, null, 4));
}

onReset() {
    this.submitted = false;
    this.surveyForm.reset();
}
}

