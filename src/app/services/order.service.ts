import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { GenericListResponse } from '../models/genericlistresponse';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ordersUrl = environment.apiBaseUrl +'orders?page=0';

  constructor(private http: HttpClient) { }

  getAll(token: string): Observable<GenericListResponse<Order>> {
    // update token
    httpOptions.headers =
  httpOptions.headers.set('Authorization', token);
    // now returns an Observable
    return this.http.get<GenericListResponse<Order>>(this.ordersUrl, httpOptions);
  }

}
