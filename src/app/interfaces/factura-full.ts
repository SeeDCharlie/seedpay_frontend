import { EstadoFactura } from "./estado-factura";
import { MetodoPago } from "./metodoPago";
import { Negocio } from "./negocio";
import { ProductoFacturaFull } from "./producto-factura-full";
import { Usuario } from "./usuario";

export interface FacturaFull {
  id: number
  cliente: Usuario
  domiciliario :Usuario
  vendedor :number
  negocio: Negocio
  productos: ProductoFacturaFull[]
  valor_recibido: number
  valor_devuelto: number
  metodo_pago: MetodoPago
  fecha_creacion: Date
  fecha_modificacion:Date
  estado: EstadoFactura
  valor_total: number
}
