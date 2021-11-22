import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseEpayco } from 'src/app/interfaces/responseEpayco';
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

  public orderDetails : Order = {};
  public respuestaEpayco: ResponseEpayco;

  constructor(public productService: ProductService,
              private route: ActivatedRoute,
              private ventasOnlineService: VentasOnline) { 
                this.route.queryParams.subscribe(params => {

                  this.ventasOnlineService.responseEstateEpayco(params['ref_payco']).subscribe(response=>{
                    this.respuestaEpayco = response;
                  });
                });

                

              }

  ngOnInit(): void {	
    
  }

  ngAfterViewInit() {
    
  }

}
