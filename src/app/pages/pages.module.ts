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
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    LoginComponent,
    AboutUsComponent,
    CatalogoNegociosComponent,
    CartComponent,
    //wigets components
    SliderComponent,
    BlogComponent,
    LogoComponent,
    ServicesComponent,
    CollectionComponent,
    CatalogoComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ElementsModule,
    
  ]
})
export class PagesModule { }
