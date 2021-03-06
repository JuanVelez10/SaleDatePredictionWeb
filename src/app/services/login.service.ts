import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  login(data: any): Observable<any> {
    return this.http.post('api/Account/Login', data, this.httpOptions);
  }
  
  validate(): Observable<any> {
    var token = localStorage.getItem('token');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token,
        'Accept':'application/json'
      })
    };

    return this.http.get('api/Account/Logged', this.httpOptions);
  }


}
