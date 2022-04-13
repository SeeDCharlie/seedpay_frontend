import { categoriaProducto } from "./categoriaProducto";
import { Negocio } from "./negocio";

export interface ProductoRequest {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  negocio: Negocio;
  disponible: boolean;
  categorias: categoriaProducto[];
  fecha_creacion:Date;
  imagen_64: string;
  stock: number;
}
