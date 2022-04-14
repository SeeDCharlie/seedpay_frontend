export interface ProductoCarrito {
  cantidad: number;
  producto: number;
}

export interface RegistrarVenta {
  productos: any[];
  usuario?: number;
  valor_total: number;
  valor_recibido: number;
  metodo_pago?: number;

}
