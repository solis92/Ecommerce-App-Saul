import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';  // Para tarjetas
import { MatGridListModule } from '@angular/material/grid-list';  // Para grid list
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order.model';
import { tokenResponse } from '../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  items : any []= [];

  // items = [
  //   { name: 'Producto 1', description: 'Descripción del producto 1', price: 100 },
  //   { name: 'Producto 2', description: 'Descripción del producto 2', price: 200 },
  //   { name: 'Producto 3', description: 'Descripción del producto 3', price: 300 },
  //   { name: 'Producto 4', description: 'Descripción del producto 4', price: 400 },
  //   { name: 'Producto 5', description: 'Descripción del producto 5', price: 500 },
  //   { name: 'Producto 6', description: 'Descripción del producto 6', price: 600 }
  // ];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('tokenBearer')
    var iteraccion = 1;
    if(token)
      {
        const decoded = jwtDecode(token);

        for (let key in decoded) {
          if(iteraccion == 1){
          const userid = (decoded as any)[key];
          }
          iteraccion = iteraccion + 1;
        }
        const productlist = this.authService.productlist(token).subscribe({
          next: (data) => {
            console.log(data);
            //console.log(data.value);
            // this.items = data['value'].map(function(x){ 
            //   return { name: x.nombre, description: x.idProducto, price: x.precio }
            // });
            this.items = data;
          },
          error: (err) => {
            console.error('No se pueden obtener la lista ', err);
          }
        });
        console.log('lista ');

        //const fetch = new Fetch("https://localhost:****/home/getdata", 'post');
        
    // fetch.send();

    // fetch.onsuccess = (data: string) => {
     //this.items.fill = JSON.parse(data);};
    }
    else{
      this.router.navigate(['/login'])
    }
   }

  // Función que se ejecuta al hacer clic en "Agregar"
  addItem(item: any): void {
    console.log('Producto agregado:', item);
    // Aquí puedes agregar lógica 
  }

  // Función que se ejecuta al hacer clic en "Ver Detalle"
  getDetail(item: any): void {
    console.log('Ver detalle del producto:', item);
    // Aquí puedes agregar lógica para 
  }

  getProducts(item: any): void {
    console.log('Ver detalle del producto:', item);
    // Aquí puedes agregar lógica para ejecute mi api getproducts 
  }

  getOrder(item: any): void {
    console.log('Ver detalle del producto:', item);
    // Aquí puedes agregar lógica para 
  }
}