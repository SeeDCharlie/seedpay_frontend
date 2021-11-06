import { Factura } from "./factura";

export interface Pedidos {
    id: number;
    factura: Factura;
    estado_pedido: string;
    metodo_pago:string;
    estado_factura: string;
    fecha_creacion: Date;
    valor_total: number;
}