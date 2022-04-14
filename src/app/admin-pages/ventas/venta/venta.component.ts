import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Negocio } from 'src/app/interfaces/negocio';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoRequest } from 'src/app/interfaces/producto-request';
import { RegistrarVenta } from 'src/app/interfaces/productoCarrito';
import { ProductoCarritoFull } from 'src/app/interfaces/producto_carrito';
import { UsuarioSession } from 'src/app/interfaces/usuario-session';
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
    private productoService:ProductoService
  ) {
    this.usuarioSession = JSON.parse(sessionStorage.getItem('user') || '{}') as UsuarioSession

    this.cargarProductos()
    this.cargarNegocios()
   }

  ngOnInit(): void {

  }

  async cargarProductos(){
    this.productoService.buscarProductosFullPorUsuario(this.usuarioSession.id).subscribe({
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

}
