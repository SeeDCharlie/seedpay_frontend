import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformeVentasComponent } from './informe-ventas/informe-ventas.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { VentaComponent } from './venta/venta.component';
import { VentasComponent } from './ventas.component';

const routes: Routes = [
  {
    path: '', component: VentasComponent
  },
  {
    path: 'venta', component: VentaComponent, data:{
      breadcrumb : "Nueva Venta"
    }
  },
  {
    path: 'pedidos', component: PedidosComponent, data:{
      breadcrumb : "Pedidos"
    }
  },
  {
    path: 'informeVentas', component: InformeVentasComponent, data:{
      breadcrumb : "Informe de ventas"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
