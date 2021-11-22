import { Factura } from "./factura";
import { Usuario } from "./usuario";

export class ProductoPedido{
    producto:number;
    cantidad:number;
}

export class PedidoVentaOnline{
    usuario: Usuario;
    transporte:number;
    negocio:number;
    metodo_pago:number;
    productos:ProductoPedido[]= [];
    total:number;
}

