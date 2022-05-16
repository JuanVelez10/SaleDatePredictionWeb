import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  idCustomer:any;
  ngOnInit(): void {
    this.idCustomer = this.route.snapshot.params["id"];

    
  }



}
