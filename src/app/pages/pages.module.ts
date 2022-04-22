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
import { CatalogoNegociosComponent } from './catalogo-negocios/catalogo-negocios.component';
import { ElementsModule } from '../elements/elements.module';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CartComponent } from './shop/cart/cart.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { CollectionNoSidebarComponent } from './shop/collection/collection-no-sidebar/collection-no-sidebar.component';
import { GridComponent } from './shop/collection/widgets/grid/grid.component';
import { PaginationComponent } from './shop/collection/widgets/pagination/pagination.component';
import { ImageOutsideComponent } from './shop/product/image-outside/image-outside.component';
import { StockInventoryComponent } from './shop/product/widgets/stock-inventory/stock-inventory.component';
import { SocialComponent } from './shop/product/widgets/social/social.component';
import { SuccessComponent } from './shop/checkout/success/success.component';
import { PqrsfComponent } from './pqrsf/pqrsf.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    LoginComponent,
    AboutUsComponent,
    CatalogoNegociosComponent,
    CartComponent,
    CheckoutComponent,
    CollectionNoSidebarComponent,
    GridComponent,
    PaginationComponent,
    ImageOutsideComponent,
    StockInventoryComponent,
    SocialComponent,
    SuccessComponent,
    //wigets components
    SliderComponent,
    BlogComponent,
    LogoComponent,
    ServicesComponent,
    CollectionComponent,
    CatalogoComponent,
    PqrsfComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ElementsModule,

  ]
})
export class PagesModule { }
