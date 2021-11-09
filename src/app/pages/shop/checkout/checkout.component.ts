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
    private departamentoService: DepartamentoService,
    private ciudadService: CiudadService,
    private tipoTransporteService: TipoTransporteService) {
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      // metodoPago: ['', [Validators.required]],
    });
    this.departamentoService.consultarDepartamentos().subscribe(response => {
      this.departamentos = response;
      console.log('deps : ' + this.departamentos);
    });
    this.ciudadService.consultarCiudades().subscribe(response => {
      this.ciudades = response;
      console.log('ciudades : ' + this.ciudades)
    });
    this.tipoTransporteService.getTiposTransporte().subscribe(response => {
      this.tiposTransporte = response;
    });
    this.usuario = JSON.parse(sessionStorage.getItem('usuario')) || {};
    this.pedidoVentaOnline.usuario = this.usuario;
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

    let handler = ePayco.checkout.configure({
      key: 'e45e28fb95e0375d361735837ed3f402',
      test: true
    })
    var data = {
      //Parámetros compra (obligatorio)
      name: "Vestido Mujer Primavera",
      description: "Vestido Mujer Primavera",
      invoice: "1234",
      currency: "cop",
      amount: "12000",
      tax_base: "0",
      tax: "0",
      tax_ico: "0", //Hace referencia al impuesto nacional al consumo
      country: "co",
      lang: "en",

      //Onpage="false" - Standard="true"
      external: "false",


      //Atributos opcionales, los parámetros extras deben ser enviados como un string
      extra1: "extra1",
      extra2: "extra2",
      extra3: "extra3",
      confirmation: "http://secure2.payco.co/prueba_curl.php",
      response: "http://secure2.payco.co/prueba_curl.php",

      //Atributos cliente
      name_billing: "Andres Perez",
      address_billing: "Carrera 19 número 14 91",
      type_doc_billing: "cc",
      mobilephone_billing: "3050000000",
      number_doc_billing: "100000000",

      //atributo deshabilitación método de pago
      // methodsDisable: ["TDC", "PSE", "SP", "CASH", "DP"]

    }
    handler.open(data)


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
