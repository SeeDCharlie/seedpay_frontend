import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';

// Widgest Components
import { SliderComponent } from './widgets/slider/slider.component';
import { BlogComponent } from './widgets/blog/blog.component';
import { LogoComponent } from './widgets/logo/logo.component';
import { ServicesComponent } from './widgets/services/services.component';
import { CollectionComponent } from './widgets/collection/collection.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { NegocioComponent } from './negocio/negocio.component';
import { ProductoComponent } from './producto/producto.component';
import { CatalogoNegociosComponent } from './catalogo-negocios/catalogo-negocios.component';
import { ProductSliderComponent } from '../elements/product/product-slider/product-slider.component';
import { ElementsModule } from '../elements/elements.module';
<<<<<<< HEAD
import { CatalogoComponent } from './catalogo/catalogo.component';
=======
import { RegistrarVentaComponent } from './registrar-venta/registrar-venta.component';
>>>>>>> c454094ba35c609c15a9436e7f468d219997a9dd



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    LoginComponent,
    AboutUsComponent,
    CatalogoNegociosComponent,
    //wigets components
    SliderComponent,
    BlogComponent,
    LogoComponent,
    ServicesComponent,
    CollectionComponent,
    CuentaComponent,
    NegocioComponent,
    ProductoComponent,
<<<<<<< HEAD
    CatalogoComponent,
=======
    RegistrarVentaComponent,
>>>>>>> c454094ba35c609c15a9436e7f468d219997a9dd
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ElementsModule,
    
  ]
})
export class PagesModule { }
