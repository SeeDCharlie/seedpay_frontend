import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductosComponent } from './productos.component';

const routes: Routes = [
  { path: '', component: ProductosComponent },
  {
    path: 'lista', component: ListaProductosComponent, data:{breadcrumb: "Lista"}
  },
  {
    path:'producto', component: ProductoComponent, data:{breadcrumb: "Producto"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
