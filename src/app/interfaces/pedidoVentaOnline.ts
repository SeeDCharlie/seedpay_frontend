import { Factura } from "./factura";
import { Usuario } from "./usuario";

export class ProductoPedido{
    producto:number;
    cantidad:number;
}

export class PedidoVentaOnline{
    usuario?: Usuario;
    direccion: string;
    descripcion:string;
    transporte:number;
    metodo_pago:number;
    tel_contacto:number;
    productos:ProductoPedido[]= [];
    total:number;
}

