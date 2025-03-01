export interface Order {
            idOrden: number,
            idUsuario: number,
            total: number
}

export interface OrderDetail {
            idOrdenDetalle: number,
            idOrden: number,
            idProducto: number,
            cantidad: number,
            costo: number,
            subTotal: number
}

export interface OrderResponse {
    values : Order []
}

export interface OrderDetailResponse {
    values : OrderDetail []
}

