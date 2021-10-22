import { Component, OnInit, Input } from '@angular/core';
import { ProductSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements OnInit {

  @Input() nombreNegocio: string = 'Cat';
  @Input() idNegocio: number = 0;
  @Input() imgNegocio: string;
  @Input() products: Producto[];;

  public ProductSliderConfig: any = ProductSlider;
  
  constructor(public productService: ProductoService) { 

  }

  ngOnInit(): void {
    
    // this.productService.buscarProductoIdNegocio(this.idNegocio).subscribe(response => this.products = response);
  }

}
