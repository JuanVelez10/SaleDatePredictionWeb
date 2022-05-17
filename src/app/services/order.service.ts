import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private httpOptions: any;

  constructor(private http: HttpClient) {
    var token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token,
        'Accept':'application/json'
      })
    };
  }

  getOrders(id:any): Observable<any> {
    return this.http.get('api/Order/Customer/' + id, this.httpOptions);
  }

}
