import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Factura } from 'src/app/interfaces/factura';
import { Negocio } from 'src/app/interfaces/negocio';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoRequest } from 'src/app/interfaces/producto-request';
import { ProductoCarrito, RegistrarVenta } from 'src/app/interfaces/productoCarrito';
import { ProductoCarritoFull } from 'src/app/interfaces/producto_carrito';
import { UsuarioSession } from 'src/app/interfaces/usuario-session';
import { CarritoComprasService } from 'src/app/services/carrito-compras.service';
import { NegocioService } from 'src/app/services/negocio.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {


  productos: ProductoRequest[] = []
  negocios: Negocio[] = []
  carrito: any
  usuarioSession: UsuarioSession = {} as UsuarioSession
  venta: RegistrarVenta = {} as RegistrarVenta
  productosCarrito: ProductoCarritoFull[] = [] as ProductoCarritoFull[]

  constructor(
    private negocioService:NegocioService,
    private productoService:ProductoService,
    private modalService: NgbModal,
    private carritoVentaService: CarritoComprasService,
    private _toast: ToastrService,
    private _router:Router,
  ) {
    this.usuarioSession = JSON.parse(sessionStorage.getItem('user') || '{}') as UsuarioSession

    this.cargarProductos()
    this.cargarNegocios()
   }

  ngOnInit(): void {

  }

  async cargarProductos(){
    this.productoService.buscarProductosFullDisponiblesPorUsuario(this.usuarioSession.id).subscribe({
      next: (data:ProductoRequest[]) => {
        this.productos = data
      },
      error: (error:any) => {}
    })
  }

  async cargarNegocios(){
    this.negocioService.buscarNegocioIdUsuario(this.usuarioSession.id).subscribe({
      next: (data:Negocio[]) => {this.negocios = data},
      error: (error:any) => {}

    })
  }

  addToCart(producto:ProductoRequest){

    let idx = this.buscarEnProductoCarrito(producto)
    //alert(JSON.stringify(producto) + " " + idx)
    if(idx>-1){
      this.aumentarCantidad(this.productosCarrito[idx])
    }else{
      this.productosCarrito.push({
        producto:producto ,
        cantidad:1
      } as ProductoCarritoFull)
      this.calcularValorTotal()
      //alert("tamaño " + this.productosCarrito.length)
    }

  }

  removeItemCart(idx:number){
    this.productosCarrito.forEach((element,index)=>{
      if(element.producto.id == idx) this.productosCarrito.splice(index,1);
   });
   this.calcularValorTotal()
  }

  buscarEnProductoCarrito(producto:ProductoRequest):number{
    return this.productosCarrito.findIndex(
      x => x.producto.id == producto.id)
  }

  calcularValorTotal(){
    let total = 0
    this.productosCarrito.map( obj => {
      total += +obj.cantidad * +obj.producto.precio
    })
    this.venta.valor_total = total
  }

  aumentarCantidad(item:ProductoCarritoFull){
    if(item.cantidad < item.producto.stock){
      item.cantidad += 1
      this.calcularValorTotal()
    }
  }

  disminuirCantidad(item:ProductoCarritoFull){
    if(item.cantidad > -1){
      item.cantidad -= 1
      this.calcularValorTotal()
    }
  }

  filtroProductosPorNegocio(id:number){
    this.productoService.buscarProductosFullDisponiblesPorIdNegocio(id).subscribe({
      next: (data:ProductoRequest[]) => {this.productos = data},
      error: (error:any) => {}
    })
  }

  registrarVenta(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  registrarFactura(){
    this.venta.metodo_pago = 2
    this.venta.productos = this.getIdsProductosCarrito()
    this.venta.vendedor = this.usuarioSession.id

    this.carritoVentaService.registrarVenta(this.venta).subscribe({
      next: (data:Factura) => {
        this._toast.success("Venta realizada exitosamente.", "Venta exitosa", {
          timeOut: 5000
        });
        this.modalService.dismissAll()
        this._router.navigate(['/ventas/historial'])
      },
      error: (error: any) => {
        this._toast.error(JSON.stringify(error.error), "Ha sucedido un inconveniente", {
          timeOut: 5000
        });
      }
    })

  }

  getIdsProductosCarrito():ProductoCarrito[]{
    let l = []
    this.productosCarrito.forEach( obj => {
      l.push({producto:obj.producto.id, cantidad:obj.cantidad} as ProductoCarrito)
    })
    return l
  }

}
