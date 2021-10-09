import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { negocioProductos } from 'src/app/interfaces/negocioProductos';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoCarrito } from 'src/app/interfaces/productoCarrito';
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

  listaNegocioProductos: negocioProductos[] = [];

  constructor(
    private _toast: ToastrService,
    private _usuarioService: UsuarioService,
    private _productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    this.cargarNegocioProductos();
  }

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

  getIdProducto(id) {
    this._productoService.buscarProductoId(id).subscribe(
      data => {
        this.producto = null;
        window.scroll(0,40);

        this.producto = data;
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

}//END CLASS
