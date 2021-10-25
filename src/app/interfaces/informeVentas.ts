export interface PetInforme {
  usuario: number;
  mes:     number;
  año:     number;
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
}

export interface ProductoInforme {
  producto:         string;
  unidadesVendidas: number;
  valorTotal:       string;
}


