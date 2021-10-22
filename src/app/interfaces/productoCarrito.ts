export interface ProductoCarrito {
  cantidad: number;
  producto: number;
}

export interface registrarVenta {
  productos: ProductoCarrito[];
  usuario?: number;
  valor_total: number;
  valor_recibido: number;
  metodo_pago?: number;

}
