import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { negocioProductos } from 'src/app/interfaces/negocioProductos';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoCarrito, registrarVenta } from 'src/app/interfaces/productoCarrito';
import { CarritoComprasService } from 'src/app/services/carrito-compras.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styleUrls: ['./registrar-venta.component.scss']
})
export class RegistrarVentaComponent implements OnInit {

  formProducto: FormGroup;

  idUsuario: string = sessionStorage.getItem('id');

  producto: Producto = null;
  cantidad: number = 1;
  valorCantidad: number;
  totalPagar: number = 0;
  edicionProducto: boolean = false;

  listaNegocioProductos: negocioProductos[] = [];
  listaProductosCarrito: Producto[] = [];
  listaCarrito: ProductoCarrito[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _toast: ToastrService,
    private _usuarioService: UsuarioService,
    private _productoService: ProductoService,
    private _carritoCompras: CarritoComprasService,
  ) { }

  ngOnInit(): void {
    this.formProducto = this._formBuilder.group({
      'cantidad': [1, Validators.required]
    })

    this.cargarNegocioProductos();
  }

  // CARGA LOS NEGOCIOS Y SUS PRODUCTOS
  cargarNegocioProductos() {
    this._usuarioService.buscarNegociosProductos(this.idUsuario).subscribe(
      data => {
        this.listaNegocioProductos = data;

        if (this.listaNegocioProductos.length > 0) {
          // CARGA CATÁLOGO
          this._toast.info("Se han cargado el catálogo exitosamente.", "Carga exitosa", {
            timeOut: 5000
          });
        } else {
          // CARGA CATÁLOGO VÁCIO
          this._toast.error("El catálogo está vacío.", "Carga vacía", {
            timeOut: 5000
          });
        }
      },
      err => {
        // ERROR CATÁLOGO
        this._toast.error("Ha sucecido un error al cargar el catálogo", "Error en catálogo", {
          timeOut: 5000
        });
      }
    );
  }

  // CARGA UN PRODUCTO EN ESPECIFICO
  getIdProducto(id) {
    this._productoService.buscarProductoId(id).subscribe(
      data => {
        // LIMPIAR VALORES
        this.limpiar();
        window.scroll(0, 40);

        this.producto = data;

        this.valorCantidad = Number(this.producto.precio);

        // CARGA CATÁLOGO
        this._toast.success("Articulo seleccionado.", "Carga exitosa", {
          timeOut: 5000
        });
      },
      err => {
        // ERROR CARGA CATÁLOGO
        this._toast.error("No se ha podido cargar el articulo.", "Error al cargar", {
          timeOut: 5000
        });
      },
    )
  }

  // ACTUALIZA EL TOTAL AL AÑADIR AL CARRITO
  actualizarTotal() {
    this.totalPagar = 0;
    this.listaProductosCarrito.forEach(producto => {
      this.totalPagar += producto.precioCantidad
    });
  }

  // AGREGAR PRODUCTO AL CARRITO
  agregarCarrito() {
    if (this.formProducto.valid) {
      this.producto.cantidad = this.cantidad;
      this.producto.precioCantidad = Number(this.producto.precio) * this.cantidad;
      this.listaProductosCarrito.push(this.producto);

      this.actualizarTotal();

      // LIMPIAR VALORES
      this.limpiar();

      // AGREGAR ARTICULO
      this._toast.success("Artículo agregado al carrito.", "Agregado con éxito", {
        timeOut: 5000
      });
    } else {
      // ERROR AGREGAR ARTICULO
      this._toast.error("La cantidad ingresada es invalida.", "Error al agregar", {
        timeOut: 5000
      });
    }
  }

  // LIMPIA EL PRODUCTO SELECCIONADO
  limpiar() {
    this.producto = null;
    this.cantidad = 1;
    this.edicionProducto = false;
    this.formProducto.controls.cantidad.setValue(this.cantidad);
  }

  // ACTUALIZA PRECIO POR CANTIDAD Y CANTIDAD DEL PRODUCTO SELECCIONADO
  actualizarCantidad() {
    if (this.formProducto.valid) {
      this.cantidad = this.formProducto.controls.cantidad.value
      this.valorCantidad = Number(this.producto.precio) * this.cantidad
    } else {
      this.cantidad = 0;
      this.valorCantidad = 0;
    }
  }

  // REGISTRAR VENTA
  registrarVenta() {
    this.listaProductosCarrito.forEach(producto => {
      let productoCarrito: ProductoCarrito = {
        producto: producto.id,
        cantidad: producto.cantidad,
      }
      this.listaCarrito.push(productoCarrito)
    });

    let carrito: registrarVenta = {
      producto: this.listaCarrito
    }

    this._carritoCompras.registrarVenta(carrito).subscribe(
      data => {
        console.log(data);

        // VENTA EXÍTOSA
        this._toast.success("Se ha registrado la venta.", "Venta registrada con éxito", {
          timeOut: 5000
        });
      },
      error => {
        // ERROR DE VENTA
        this._toast.error("Error registrando la venta.", "Error generando venta", {
          timeOut: 5000
        });
      }
    )

  }

  // CARGAR PRODUCTO DE LA LISTA A EDITAR
  cargarEditarProducto(i: number) {
    this.producto = this.listaProductosCarrito[i];
    this.edicionProducto = true;

    this.formProducto.controls.cantidad.setValue(this.producto.cantidad);
    this.actualizarCantidad();
  }

  // EDITAR EL PRODUCTO SELECCIONADO DE LA LISTA
  editarProducto() {
    if (this.formProducto.valid) {
      this.producto.cantidad = this.cantidad;
      this.producto.precioCantidad = Number(this.producto.precio) * this.cantidad;

      this.actualizarTotal();

      // LIMPIAR VALORES
      this.limpiar();

      // AGREGAR ARTICULO
      this._toast.success("Artículo agregado al carrito.", "Editado con éxito", {
        timeOut: 5000
      });
    } else {
      // ERROR AGREGAR ARTICULO
      this._toast.error("La cantidad ingresada es invalida.", "Error al editar", {
        timeOut: 5000
      });
    }
  }

  // ELIMINAR PRODUCTO DEL CARRITO
  eliminarProducto(i: number) {

    this.listaProductosCarrito = this.listaProductosCarrito.filter((producto, index) => index !== i);

    this.actualizarTotal();

    // ELIMINAR ARTICULO
    this._toast.success("Artículo eliminado al carrito.", "Eliminado con éxito", {
      timeOut: 5000
    });
  }



}//END CLASS

function carrito(carrito: any) {
  throw new Error('Function not implemented.');
}

