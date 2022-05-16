import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });;
  
  isFormSubmitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  onSubmit() {
    this.isFormSubmitted = true;

    // Return if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    
  }


}
