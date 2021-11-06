import { MetodoPago } from "./metodoPago";
import { Negocio } from "./negocio";
import { Producto } from "./producto";
import { Usuario } from "./usuario";

export interface Factura {
    id: number;
    cliente: Usuario;
    domiciliario :Usuario;
    vendedor :Usuario;
    negocio: Negocio;
    productos: Producto[];
    valor_recibido: number;
    valor_devuelto: number;
    metodo_pago: MetodoPago;
    fecha_creacion: Date;
    fecha_modificacion
    estado: string;
    valor_total: number;
}