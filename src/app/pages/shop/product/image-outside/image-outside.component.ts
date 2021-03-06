import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { Producto } from 'src/app/interfaces/producto';
import { CarritoComprasLocalService } from 'src/app/services/carrito-compras-local.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SizeModalComponent } from 'src/app/shared/components/modal/size-modal/size-modal.component';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from 'src/app/shared/data/slider';

@Component({
  selector: 'app-image-outside',
  templateUrl: './image-outside.component.html',
  styleUrls: ['./image-outside.component.scss']
})
export class ImageOutsideComponent implements OnInit {

  public product: Producto ;
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;
  
  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(private route: ActivatedRoute, private router: Router,
    public productService: CarritoComprasLocalService,
    private productoServiceApi: ProductoService ) { 
      this.route.params.subscribe(params => {
        this.productoServiceApi.buscarProductoId(params.producto).subscribe(response => {
          this.product = response;
        });

    });
    }

  ngOnInit(): void {
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }

  // Get Product Size
  Size(variants) {
    const uniqSize = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size)
      }
    }
    return uniqSize
  }

  selectSize(size) {
    this.selectedSize = size;
  }
  
  // Increament
  increment() {
    this.counter++ ;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter-- ;
  }

  // Add to cart
  async addToCart(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/cart']);
  }

  // Buy Now
  async buyNow(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/preCompra']);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

}
