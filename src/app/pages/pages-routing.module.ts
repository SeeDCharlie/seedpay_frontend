import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CatalogoNegociosComponent } from './catalogo-negocios/catalogo-negocios.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { PqrsfComponent } from './pqrsf/pqrsf.component';
import { CartComponent } from './shop/cart/cart.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { SuccessComponent } from './shop/checkout/success/success.component';
import { CollectionNoSidebarComponent } from './shop/collection/collection-no-sidebar/collection-no-sidebar.component';
import { ImageOutsideComponent } from './shop/product/image-outside/image-outside.component';


const routes: Routes = [

  // INICIO
  {
    path: '', component: PagesComponent, children: [
      {
        path: 'inicio', component: HomeComponent
      },
      // LOGIN
      {
        path: 'login', component: LoginComponent
      },
      // ABOUT US
      {
        path: 'aboutus', component: AboutUsComponent
      },
      // CATEGORIA
      {
        path: 'buscar', component: CatalogoNegociosComponent
      },
      {
        path: 'cart',  component: CartComponent
      },
      {
        path: 'preCompra', component: CheckoutComponent
      },
      {
        path: 'catalogo', component: CollectionNoSidebarComponent
      },
      {
        path: 'producto/:producto' , component: ImageOutsideComponent
      },
      {
        path: 'success', component: SuccessComponent
      },
      {
        path: 'pqrsf', component: PqrsfComponent
      },
      {
        path: '', redirectTo: 'inicio', pathMatch: 'full'
      },
    ]
  },

  // DEFAULT



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
