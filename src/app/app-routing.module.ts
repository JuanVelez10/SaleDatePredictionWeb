import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './module/customer/home/home.component';
import { NewOrderComponent } from './module/customer/new-order/new-order.component';
import { OrdersComponent } from './module/customer/orders/orders.component';
import { LoginComponent } from './module/login/login/login.component';

const routes: Routes = [
 { path:"login",component:LoginComponent} ,
 { path: '', redirectTo: '/login', pathMatch: 'full' },
 { path:"home",component:HomeComponent} ,
 { path:"orders/:id",component:OrdersComponent} ,
 { path:"new/:id",component:NewOrderComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
