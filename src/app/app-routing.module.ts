import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './module/login/login/login.component';

const routes: Routes = [
 { path:"login",component:LoginComponent} ,
 { path: '', redirectTo: '/login', pathMatch: 'full' },
 { path: 'customer', loadChildren:()=> import("./module/customer/customer.module").then(x=> x.CustomerModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
