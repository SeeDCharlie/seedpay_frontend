export interface ProductoCarrito {
  cantidad: number;
  producto: number;
}

export interface registrarVenta {
  producto: ProductoCarrito[];
  usuario?: number;
  total_pagar: number;
  metodo_pago?: number;

}
