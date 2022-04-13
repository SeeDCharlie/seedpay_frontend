import { CategoriaNegocio } from "./categoriaNegocio";
import { Ciiu } from "./ciiu";
import { Producto } from "./producto";

export interface Negocio {
  id: number;
  nombre: string;
  descripcion: string;
  nit: string;
  usuario: number;
  telefono: number;
  telefono1: number;
  telefono2: number;
  correo: string;
  direccion: string;
  ciudad:number,
  imagen_64: string;
  fecha_creacion:Date,
  categorias: number[];
  negocio_ciiu: number[];
  productos:Producto[];
}
