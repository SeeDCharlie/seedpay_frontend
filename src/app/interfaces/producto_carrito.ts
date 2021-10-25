import { Producto } from "./producto";

export interface ProductoCarrito{
    producto: Producto;
    cantidad: number;
}

export interface CarritoCompra{
    productos: ProductoCarrito[];
    total:number;
}

