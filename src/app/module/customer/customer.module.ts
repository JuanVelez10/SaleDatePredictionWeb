import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent,
    OrdersComponent,
    NewOrderComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    RouterModule
  ]
})
export class CustomerModule { }
