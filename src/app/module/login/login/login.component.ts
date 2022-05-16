import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private formBuilder: FormBuilder,private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  LoginRequest: any = {
    Email: '',
    Password: ''
  };

  message : string = "";
  isSubmit=false;

  onSubmit() {
    this.message = "";
    this.isSubmit=true;
    if (this.loginForm.invalid) {
      return;
    }

    this.LoginRequest.Email = this.loginForm.controls.email.value;
    this.LoginRequest.Password = this.loginForm.controls.password.value;

    this.loginService.login(this.LoginRequest).subscribe(result => {
        if(result.data != null){
          localStorage.setItem('token',result.data.token);
          this.router.navigate(['/home']);
        }
        else {
          this.message = result.message;
        }
      },
      error => {this.message = "Error !!";});

  }


}
