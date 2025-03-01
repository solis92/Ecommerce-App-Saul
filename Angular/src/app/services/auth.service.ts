import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {UserRegister, UserLogin,UserResponse} from '../models/user.model'
import { ProductResponse, Product } from '../models/product.model';
import { OrderDetail, OrderResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5159';

  constructor(private http: HttpClient) {}

  register(user: UserRegister): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/api/Access/Register`, user);
  }

  login(user: UserLogin): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/api/Login/Login`, user);
  }

  productlist(token: string): Observable<Product[]> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`});
    return this.http.get<{value:Product[]}>(`${this.apiUrl}/api/products/`,{headers}).pipe(
      map(response=> response.value
    ));
  }

  productid(id: number, token: string): Observable<ProductResponse> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`});
    //return this.http.get<any>(`${this.apiUrl}/${id}`);
    return this.http.post<ProductResponse>(`${this.apiUrl}/api/products/${id}`,{headers});
  }

  createOrder(id: number, token: string): Observable<OrderResponse> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`});
    //return this.http.get<any>(`${this.apiUrl}/${id}`);
    return this.http.post<OrderResponse>(`${this.apiUrl}/api/products/${id}`,{headers});
  }

  createOrdeDetail(detail: OrderDetail, token: string): Observable<OrderResponse> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`});
    return this.http.post<OrderResponse>(`${this.apiUrl}/api/orders/`,detail,{headers});
  }

}
