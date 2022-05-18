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
    private employeeService:EmployeeService,private productService :ProductService,private shipperService:ShipperService
    ) { }

  idCustomer:any;
  employees:any;
  shippers:any;
  products:any;
  dt : any = new Date();

  ngOnInit(): void {
    this.idCustomer = this.route.snapshot.params["id"];
    this.validate();
    this.loadEmployees();
    this.loadShippers();
    this.loadproducts();
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

  message : string = "";
  type_message : string ="danger";
  isSubmit=false;

  onSubmit(){
    this.message = "";
    this.isSubmit=true;

    if (this.orderForm.invalid) {
      return;
    }

    var productid = this.orderForm.controls.productid.value;
    var unitprice = this.products.filter((product: { productid: any; }) => product.productid == productid)[0].unitprice;
    if (unitprice != this.orderForm.controls.unitprice.value){
      this.message = "It is not the price of the product !!";
      return;
    }

    this.convertFromToOrderRequest();

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

  loadEmployees(){
    this.employeeService.getEmployees().subscribe(
      result => {
        if(result != null){
          this.employees = result;
        }
        else{
          this.message ="Not Found !!";
        }
      },
      error => {
        this.message ="Error !!";
      });
  }

  loadShippers(){
    this.shipperService.getShippers().subscribe(
      result => {
        if(result != null){
          this.shippers = result;
        }
        else{
          this.message ="Not Found !!";
        }
      },
      error => {
        this.message ="Error !!";
      });
  }

  loadproducts(){
    this.productService.getProducts().subscribe(
      result => {
        if(result != null){
          this.products = result;
        }
        else{
          this.message ="Not Found !!";
        }
      },
      error => {
        this.message ="Error !!";
      });
  }

  getUnitPrice(){
    var productid = this.orderForm.controls.productid.value;
    var unitprice = this.products.filter((product: { productid: any; }) => product.productid == productid)[0].unitprice;
    this.orderForm.controls.unitprice.setValue(unitprice);
  }

  convertFromToOrderRequest(){
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

  /*These simulated objects are left so as not to leave free text fields, 
  but in reality they must be services that come from the api with a better 
  structure for countries and cities, for example.*/
  qytSel: string  = '1';
  countrySel: string  = 'USA';
  citySel: string  = 'Aachen';
  discountSel: string  = '0';
  freightSel: string  = '10';
  qyt=[1,2,3,4,5,6,7,8,9,10];
  countries = ['Finland','USA','Italy','Brazil','Germany','Switzerland','Mexico','Sweden','Argentina','Austria','UK','Poland','Canada','Ireland','Norway','France','Belgium','Spain','Venezuela','Denmark','Colombia','Portugal'];
  cities =["Aachen","Albuquerque","Anchorage","Århus","Barcelona","Barquisimeto","Bergamo","Berlin","Bern","Boise","Bräcke","Brandenburg","Bruxelles","Buenos Aires","Butte","Campinas","Caracas","Charleroi","Colchester","Cork","Cowes","Cunewalde","Elgin","Eugene","Frankfurt a.M.","Genève","Graz","Helsinki","I. de Margarita","Juan Prueba","Kirkland","Kobenhavn","Köln","Lander","Leipzig","Lille","Lisboa","London","Luleå","Lyon","Madrid","Manizales","Mannheim","Marseille","México D.F.","Portland","Reggio Emilia","Reims","Resende","Rio de Janeiro","Salzburg","San Cristóbal","San Francisco","Sao Paulo","Seattle","Sevilla","Stavern","Strasbourg","Stuttgart","Torino","Toulouse","Tsawassen","Vancouver","Versailles","Walla Walla","Warszawa"];
  discounts=[0.0,0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.55]
  freights=[10,20,30,40,50,60,70,80,90,100,200,300,400,500,1000]
}
