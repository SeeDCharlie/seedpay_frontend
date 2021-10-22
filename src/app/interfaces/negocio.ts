import { Producto } from "./producto";

export interface Negocio {
  id?: number;
  nombre?: string;
  descripcion?: string;
  nit?: string;
  usuario?: number;
  telefono?: number;
  telefono1?: number;
  telefono2?: number;
  correo?: string;
  direccion?: string;
  imagen_64?: string;
  categorias?: number[];
  negocio_ciiu?: number[];
  productos?:Producto[];
}
