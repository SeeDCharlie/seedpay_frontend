import { Producto } from "./producto";
import { ProductoRequest } from "./producto-request";

export interface ProductoCarritoFull{
    producto: ProductoRequest;
    cantidad: number;
}

export interface CarritoCompra{
    productos: ProductoCarritoFull[];
    total:number;
}

