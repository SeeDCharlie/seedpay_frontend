import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { PedidosService } from 'src/app/services/pedidos.service';
import { orderDB } from "../../../shared/tables/order-list";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public pedidos = [];
  public temp = [];
  public colorEstadoPedido = {
    1:"#FFDA33",
    2:"#25FF4D",
    3:"#D20000",
    4:"#E36B07",
    5:"#07D9E3",
    6:"#61E307",
    7:"#3C07E3",
    8:"#E30707",
  }
  public colorEstadoFactura = {
    1:"#FFDA33",
    2:"#07D9E3",
    3:"#E30780",
    4:"#E30707",
  }

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  constructor(private pedidosService: PedidosService) {

    pedidosService.consultarPedidosPorIdVendedor(Number(sessionStorage.getItem('id'))).subscribe( response => {
      this.pedidos = response;
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.pedidos = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  ngOnInit() {
  }

}
