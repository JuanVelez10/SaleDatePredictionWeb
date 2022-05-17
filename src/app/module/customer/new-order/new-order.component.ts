import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { ShipperService } from 'src/app/services/shipper.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  orderForm: FormGroup = this.formBuilder.group({
    empid: ['', [Validators.required]],
    shipperid: [0, [Validators.required]],
    orderdate: ['', [Validators.required]],
    requireddate: ['', [Validators.required]],
    shippeddate: ['', [Validators.required]],
    freight:  [0.0, [Validators.required]],
    shipname: ['', [Validators.required]],
    shipaddress: ['', [Validators.required]],
    shipcity: ['', [Validators.required]],
    shipcountry: ['', [Validators.required]],
    productid:  [0, [Validators.required]],
    unitprice: [0.0, [Validators.required]],
    qty:  [0, [Validators.required]],
    discount:  [0.0, [Validators.required]]
  });

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,
    private loginService: LoginService,private orderService: OrderService, private router: Router,
    private employeeService:EmployeeService,productService :ProductService,shipperService:ShipperService
    ) { }

  idCustomer:any;

  ngOnInit(): void {
    this.idCustomer = this.route.snapshot.params["id"];
    this.validate();

    

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

  OrderRequest: any = {
    custid: 0,
    empid: 0,
    shipperid: 0,
    orderdate: '',
    requireddate: '',
    shippeddate: '',
    freight: 0.0,
    shipname: '',
    shipaddress: '',
    shipcity: '',
    shipcountry: '',
    productid: 0,
    unitprice: 0.0,
    qty: 0,
    discount: 0.0
  };

  message : string = "";
  type_message : string ="danger";
  isSubmit=false;

  onSubmit(){
    this.message = "";
    this.isSubmit=true;

    if (this.orderForm.invalid) {
      return;
    }

    this.OrderRequest.custid = this.idCustomer;
    this.OrderRequest.empid = this.orderForm.controls.empid.value;
    this.OrderRequest.shipperid = this.orderForm.controls.shipperid.value;
    this.OrderRequest.orderdate = this.orderForm.controls.orderdate.value;
    this.OrderRequest.requireddate = this.orderForm.controls.requireddate.value;
    this.OrderRequest.shippeddate = this.orderForm.controls.shippeddate.value;
    this.OrderRequest.freight = this.orderForm.controls.freight.value;
    this.OrderRequest.shipname = this.orderForm.controls.shipname.value;
    this.OrderRequest.shipaddress = this.orderForm.controls.shipaddress.value;
    this.OrderRequest.shipcity = this.orderForm.controls.shipcity.value;
    this.OrderRequest.shipcountry = this.orderForm.controls.shipcountry.value;
    this.OrderRequest.productid = this.orderForm.controls.productid.value;
    this.OrderRequest.unitprice = this.orderForm.controls.unitprice.value;
    this.OrderRequest.qty = this.orderForm.controls.qty.value;
    this.OrderRequest.discount = this.orderForm.controls.discount.value;

    this.orderService.newOrder(this.OrderRequest).subscribe(result => {
        if(result.data == true){
          this.message = result.message;
          this.type_message ="success";
        }
        else {
          this.message = result.message;
        }
      },
      error => {this.message = "Error !!";});

  }



}
