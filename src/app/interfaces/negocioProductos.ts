export interface negocioProductos {
  id:        number;
  nombre:    string;
  productos: ProductoElement[];
}

export interface ProductoElement {
  id:          number;
  nombre:      string;
  descripcion: string;
  precio:      string;
  negocio:     number;
  disponible:  boolean;
  categorias:  any[];
  imagen_64:   string;
}
