import { L } from "@angular/cdk/keycodes"

export interface Product{
    idProducto: number,
    nombre: string,
    marca: string,
    precio: number
}

export interface ProductResponse {
    values : Product []
}