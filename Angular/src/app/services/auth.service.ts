import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {UserRegister, UserLogin,UserResponse} from '../models/user.model'
import { ProductResponse, Product } from '../models/product.model';
import { OrderDetail, OrderDetailResponse, OrderResponse } from '../models/order.model';

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

  //Products
  productlist(token: string): Observable<Product[]> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`});
    return this.http.get<{value:Product[]}>(`${this.apiUrl}/api/products/`,{headers}).pipe(
      map(response=> response.value
    ));
  }

  productid(id: number, token: string): Observable<ProductResponse> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`});
    return this.http.post<ProductResponse>(`${this.apiUrl}/api/products/${id}`,{headers});
  }

  //Orders
  orderlist(token: string): Observable<OrderResponse> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`});
    return this.http.post<OrderResponse>(`${this.apiUrl}/api/Orders/`,{headers});
  }

  ordercreate(id: number, token: string): Observable<OrderResponse> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`});
    return this.http.post<OrderResponse>(`${this.apiUrl}/api/Orders/${id}`,{headers});
  }

  orderget(id: number, token: string): Observable<OrderResponse> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`});
    return this.http.post<OrderResponse>(`${this.apiUrl}/api/Orders/${id}`,{headers});
  }

  orderupdate(id: number, token: string): Observable<OrderResponse> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`});
    return this.http.patch<OrderResponse>(`${this.apiUrl}/api/Orders/${id}`,{headers});
  }

  //OrderDetails
  detailcreate(id: number, token: string): Observable<OrderDetailResponse> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`});
    return this.http.post<OrderDetailResponse>(`${this.apiUrl}/api/Orders/${id}`,{headers});
  }

  oetailget(id: number, token: string): Observable<OrderDetailResponse> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}`});
    return this.http.post<OrderDetailResponse>(`${this.apiUrl}/api/Orders/${id}`,{headers});
  }

}
