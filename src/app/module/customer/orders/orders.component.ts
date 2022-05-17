import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private orderService:OrderService,private route: ActivatedRoute,private loginService: LoginService, private router: Router) { }

  idCustomer:any;
  orders:any;
  message : string = "";
  p: number = 1;
  
  ngOnInit(): void {
    this.idCustomer = this.route.snapshot.params["id"];
    this.validate();
    this.loadOrders(this.idCustomer);
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

  loadOrders(id:any){
    this.orderService.getOrders(id).subscribe(
      result => {
        if(result != null){
          this.orders = result;
        }
        else{
          this.message ="Not Found !!";
        }
      },
      error => {
        this.message ="Error !!";
      });
  }

}
