import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { CarritoComprasLocalService } from 'src/app/services/carrito-compras-local.service';
import { Producto } from 'src/app/interfaces/producto';
import { OrderService } from 'src/app/shared/services/order.service';
import { environment } from 'src/environments/environment';
import { Departamento } from 'src/app/interfaces/departamento';
import { Ciudad } from 'src/app/interfaces/ciudad';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { TipoTransporte } from 'src/app/interfaces/tipoTransporte';
import { TipoTransporteService } from 'src/app/services/tipoTransporte.service';
import { PedidoVentaOnline, ProductoPedido } from 'src/app/interfaces/pedidoVentaOnline';
import { VentasOnline } from 'src/app/services/ventas-online.service';
declare const ePayco: any;
declare const testalert: any;


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],

})
export class CheckoutComponent implements OnInit {

  public checkoutForm: FormGroup;
  public products: Producto[] = [];
  public payPalConfig?: IPayPalConfig;
  public payment: string = 'Stripe';
  public amount: any;
  public departamentos: Departamento[];
  public ciudades: Ciudad[];
  public usuario: Usuario;
  public tiposTransporte: TipoTransporte[];
  public pedidoVentaOnline: PedidoVentaOnline = new PedidoVentaOnline();


  constructor(private fb: FormBuilder,
    public productService: CarritoComprasLocalService,
    private orderService: OrderService,
    private tipoTransporteService: TipoTransporteService,
    private ventaOnlineService: VentasOnline) {
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      metodoPago: ['', [Validators.required]],
      transporte: ['', [Validators.required]],
    });
    this.tipoTransporteService.getTiposTransporte().subscribe(response => {
      this.tiposTransporte = response;
    });
    this.usuario = JSON.parse(sessionStorage.getItem('usuario')) || {};
    this.pedidoVentaOnline.usuario = this.usuario;
    this.pedidoVentaOnline.negocio = Number(localStorage.getItem('negocioCatalogo'));
    this.pedidoVentaOnline.total = this.getTotal();
    this.setCartItems();
  }

  ngOnInit(): void {
    this.products = this.productService.cartItems;
    this.initConfig();
  }

  public getTotal(): number {
    return this.productService.cartTotalAmount();
  }

  // Stripe Payment Gateway
  stripeCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripe_token, // publishble key
      locale: 'auto',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount);
      }
    });
    handler.open({
      name: 'Multikart',
      description: 'Online Fashion Store',
      amount: this.amount * 100
    })
  }

  // Paypal Payment Gateway
  private initConfig(): void {
    this.payPalConfig = {
      currency: this.productService.Currency.currency,
      clientId: environment.paypal_token,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: this.productService.Currency.currency,
            value: this.amount,
            breakdown: {
              item_total: {
                currency_code: this.productService.Currency.currency,
                value: this.amount
              }
            }
          }
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        size: 'small', // small | medium | large | responsive
        shape: 'rect', // pill | rect
      },
      onApprove: (data, actions) => {
        this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal);
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }


  tipoTransporte(evt) {
    var target = evt.target;
    if (target.checked) {

    }
  }

  realizarPedido() {
    alert("dats : " + JSON.stringify(this.pedidoVentaOnline))
    console.log("dats : " + JSON.stringify(this.pedidoVentaOnline))
    let handler = ePayco.checkout.configure({
      key: 'e45e28fb95e0375d361735837ed3f402',
      test: true
    })
    this.pedidoVentaOnline.negocio=1
    this.pedidoVentaOnline.transporte=1
    this.ventaOnlineService.responseEpayco(this.pedidoVentaOnline).subscribe(response =>{
      handler.open(response)
    });

    return true
  }

  setCartItems() {
    this.productService.cartItems.forEach(itm => {
      let productoCantidad: ProductoPedido = new ProductoPedido();
      productoCantidad.producto = itm.id;
      productoCantidad.cantidad = itm.quantity;
      this.pedidoVentaOnline.productos.push(productoCantidad);
    });
  }

}
