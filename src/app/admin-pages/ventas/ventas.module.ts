import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './ventas.component';
import { VentaComponent } from './venta/venta.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InformeVentasComponent } from './informe-ventas/informe-ventas.component';


@NgModule({
  declarations: [
    VentasComponent,
    VentaComponent,
    PedidosComponent,
    InformeVentasComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule,
    SharedModule,
  ]
})
export class VentasModule { }
