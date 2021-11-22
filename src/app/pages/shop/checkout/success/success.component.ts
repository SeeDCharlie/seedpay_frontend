import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';
import { ResponseEpayco } from 'src/app/interfaces/responseEpayco';
import { Usuario } from 'src/app/interfaces/usuario';
import { VentasOnline } from 'src/app/services/ventas-online.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Order } from '../../../../shared/classes/order';
import { OrderService } from '../../../../shared/services/order.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit{

  public orderDetails : Producto[];
  public respuestaEpayco: ResponseEpayco;
  // public usuarioPedido: Usuario;

  constructor(public productService: ProductService,
              private route: ActivatedRoute,
              private ventasOnlineService: VentasOnline) { 
                var referencia:string = "";
                this.route.queryParams.subscribe(params => {
                    referencia = params['ref_payco']
                });

                this.ventasOnlineService.responseEstateEpayco(referencia).subscribe(response=>{
                  this.respuestaEpayco = response['data'];
                });

                this.orderDetails = JSON.parse(localStorage.getItem('cartItems')) || null

              }

  ngOnInit(): void {	
    
  }

  ngAfterViewInit() {
    
  }

}
