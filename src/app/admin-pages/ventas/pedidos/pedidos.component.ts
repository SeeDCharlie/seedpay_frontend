import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UsuarioSession } from 'src/app/interfaces/usuario-session';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  pedidos = [];
  temp = [];
  colorEstadoPedido = {
    1:"#FFDA33",
    2:"#25FF4D",
    3:"#D20000",
    4:"#E36B07",
    5:"#07D9E3",
    6:"#61E307",
    7:"#3C07E3",
    8:"#E30707",
  }
  colorEstadoFactura = {
    1:"#FFDA33",
    2:"#07D9E3",
    3:"#E30780",
    4:"#E30707",
  }


  usuarioSession:UsuarioSession = {} as UsuarioSession

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  constructor(private pedidosService: PedidosService) {
    this.usuarioSession = JSON.parse(sessionStorage.getItem('user') || '{}')
    pedidosService.consultarPedidosPorIdVendedor(this.usuarioSession.id).subscribe( response => {
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
