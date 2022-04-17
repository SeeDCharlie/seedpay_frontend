import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/interfaces/factura';
import { FacturaFull } from 'src/app/interfaces/factura-full';
import { UsuarioSession } from 'src/app/interfaces/usuario-session';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {

  facturas: FacturaFull[] = []

  usuarioSession:UsuarioSession = {} as UsuarioSession
  constructor(
    private facturaService:FacturaService
  ) {
    this.usuarioSession = JSON.parse(sessionStorage.getItem('user') || '{}')
    this.cargarFacturas()
   }

  ngOnInit(): void {
  }

  updateFilter(evt){

  }

  cargarFacturas(){
    this.facturaService.consultarFacturasPorVendedor(this.usuarioSession.id).subscribe({
      next: (data:FacturaFull[]) => {
        this.facturas = data
      },
      error: () => {}
    })
  }

  eliminarFactura(i:number){

  }

}
