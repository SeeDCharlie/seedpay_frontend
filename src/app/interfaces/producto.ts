export interface Producto {
  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: string;
  negocio?: number;
  disponible?: boolean;
  categorias?: any[];
  imagen_64?: string;
  cantidad?: number;
  precioCantidad?: number;
}
