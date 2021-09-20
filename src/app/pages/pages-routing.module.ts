import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CatalogoNegociosComponent } from './catalogo-negocios/catalogo-negocios.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NegocioComponent } from './negocio/negocio.component';
import { PagesComponent } from './pages.component';
import { ProductoComponent } from './producto/producto.component';


const routes: Routes = [

  {
    path: 'inicio', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'aboutus', component: AboutUsComponent
  },
  {
    path: 'categorias/:categoria', component: CatalogoNegociosComponent
  },
  {
    path: 'inicio', component: HomeComponent
  },
  // Producto
  {
    path: 'producto', component: ProductoComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', redirectTo: 'inicio', pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
