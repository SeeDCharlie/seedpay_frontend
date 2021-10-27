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

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  constructor(private pedidosService: PedidosService) {
    pedidosService.consultarPedidos().subscribe( response => {
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
