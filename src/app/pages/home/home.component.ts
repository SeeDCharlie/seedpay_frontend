import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductSlider, CollectionSlider } from '../../shared/data/slider';
import { Product } from '../../shared/classes/product';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public themeLogo: string = 'assets/images/icon/logo-14.png'; // Change Logo

  public products: Product[] = [];
  public productCollections: any[] = [];

  public ProductSliderConfig: any = ProductSlider;
  public CollectionSliderConfig: any = CollectionSlider;

  constructor(private _sanitizer:DomSanitizer,
    public productService: ProductService) {

  }

  public sliders = [{
    title: 'SeedPay YA!',
    subTitle: 'Adquierelo',
    image: 'assets/images/slider/home_slider_1.jpg',
    link: '/inicio',
  }, {
    title: 'Mas que un catalogo',
    subTitle: 'Somos tu mano amiga',
    image: 'assets/images/slider/home_slider_2.jpg',
    link: '/inicio',
  }];

  // Logo
  public logos = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',
  }];

  // Collection
  public categories = [{
    image: 'assets/images/categories/1.jpg',
    link: '/login',
    title: 'Comidas rapidas',
    text:  this._sanitizer.bypassSecurityTrustHtml(''),
  }, {
    image: 'assets/images/categories/2.jpg',
    link: '/inicio',
    title: 'Ropa Deportiva',
    text:  this._sanitizer.bypassSecurityTrustHtml(''),
  }, {
    image: 'assets/images/categories/3.jpg',
    link: '/inicio',
    title: 'Fisico Terapia',
    text:  this._sanitizer.bypassSecurityTrustHtml(''),
  }, {
    image: 'assets/images/categories/4.jpg',
    link: '/inicio',
    title: 'Drogerias',
    text:  this._sanitizer.bypassSecurityTrustHtml(''),
  }, {
    image: 'assets/images/categories/1.jpg',
    link: '/inicio',
    title: 'Tiendas',
    text:  this._sanitizer.bypassSecurityTrustHtml(''),
  }]

  // collection
  public collections = [{
    image: 'assets/images/collection/cell_1.png',
    title: 'Sansung s12',
    link: '/inicio',
    text: 'Snsung Galaxy'
  }, {
    image: 'assets/images/collection/moto_1.png',
    title: 'XTZ',
    link: '/inicio',
    text: 'YAMAHA'
  }, {
    image: 'assets/images/collection/pizza_1.jpg',
    title: 'Pizza Champiñones',
    link: '/inicio',
    text: 'PIZZA MANIA'
  }]

   // Blog
  public blogs = [{
    image: 'assets/images/blog/10.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/11.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/12.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/13.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }]

  ngOnInit(): void {
    // Change color for this layout
    document.documentElement.style.setProperty('--theme-deafult', '#e4604a');
  }

  ngOnDestroy(): void {
    // Remove Color
    document.documentElement.style.removeProperty('--theme-deafult');
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }
}
