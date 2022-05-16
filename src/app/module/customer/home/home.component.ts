import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup = this.formBuilder.group({
    search: [''],
  });

  constructor(private formBuilder: FormBuilder,private loginService: LoginService,private customerService: CustomerService, private router: Router) { }
  
  customers:any;
  message : string = "";
  p: number = 1;
  
  ngOnInit(): void {
    this.validate();
    this.loadCustomer("none");
  }

  validate(){
    this.loginService.validate().subscribe(
      result => {
        if(result == null && result.id == null){
          this.router.navigate(['/login']);
        }
      },
      error => {
        this.router.navigate(['/login']);
      });
  }

  loadCustomer(name:any){
    this.customerService.getCustomers(name).subscribe(
      result => {
        if(result != null){
          this.customers = result;
        }
        else{
          this.message ="Not Found !!";
        }
      },
      error => {
        this.message ="Error !!";
      });
  }

  onSearch() {
    var name = this.searchForm.controls.search.value;
    if(name === "") name="none";
    this.loadCustomer(name);
  }


}
