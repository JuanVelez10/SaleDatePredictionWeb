import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path:"home",component:HomeComponent} ,
  { path:"orders",component:OrdersComponent} ,
  { path:"new",component:NewOrderComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
