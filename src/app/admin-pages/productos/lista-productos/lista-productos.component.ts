import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/interfaces/producto';
import { UsuarioSession } from 'src/app/interfaces/usuario-session';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {

  lista_productos: Producto[] = []
  usuarioSession: UsuarioSession = JSON.parse('{}')
  public selected = [];

  constructor(
    private ProductoService:ProductoService,
    private _toast: ToastrService,
  ) {
    this.usuarioSession = JSON.parse(sessionStorage.getItem('user') || '{}')
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  ngOnInit() {
    this.cargarProductos()
  }

  async cargarProductos() {
    this.ProductoService.buscarProductosPorUsuario(this.usuarioSession.id).subscribe({
      next: (data:Producto[]) => {
        this.lista_productos = data
        this._toast.info("Se han cargado tus Productos exitosamente.", "Carga exitosa", {
          timeOut: 5000
        });
      },
      error: (error:any) => {
        this._toast.info(`Ocurrio un error al cargar tus Productos, itenta mas tarde ${error.error}`, "Informacion importante", {
          timeOut: 5000
        });
      }
    })
  }

  async eliminarProducto(id:number){
    this.ProductoService.eliminarProducto(id).subscribe({
      next: () => {
        this._toast.success(JSON.stringify("Producto ELiminado"), "Accion Exitosa", {
        timeOut: 5000
      });
      this.lista_productos = this.lista_productos.map(
        as => {
          if(as.id !== id){
            return as
          }
        }
      )
    },
      error: (error:any) => {}
    })
  }
}
