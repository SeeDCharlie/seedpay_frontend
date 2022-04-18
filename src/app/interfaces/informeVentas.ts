import { Producto } from "./producto";

export interface PetInforme {
  usuario: number;
  fechaInicio:     string;
  fechaFin:     string;
}

export interface ReqInforme {
  total?:    string;
  negocios?: NegociosInforme[];
}

export interface NegociosInforme {
  negocio:   NegocioInforme;
  productos: ProductoInforme[];
  total:     string;
}

export interface NegocioInforme {
  id:          number;
  nombre:      string;
  descripcion: string;
  usuario:     number;
  correo:      string;
  direccion:   string;
  imagen_64:   string;
}

export interface ProductoInforme {
  producto:         number;
  nombreProducto:    string;
  imagen:           string;
  unidadesVendidas: number;
  valorTotal:       string;
}


