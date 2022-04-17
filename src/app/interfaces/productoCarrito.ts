export interface ProductoCarrito {
  cantidad: number;
  producto: number;
}

export interface RegistrarVenta {
  productos: ProductoCarrito[];
  cliente: number;
  vendedor:number,
  valor_total: number;
  valor_recibido: number;
  metodo_pago: number;
}
