import { categoriaProducto } from "./categoriaProducto";

export interface ProductoFull {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  negocio: number;
  disponible: number;
  categorias: categoriaProducto[];
  imagen_64: string;
  stock: number;
}
export interface ProductoFacturaFull {
  producto:ProductoFull,
  cantidad:number
}
