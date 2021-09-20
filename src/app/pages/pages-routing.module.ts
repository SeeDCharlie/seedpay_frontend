import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AboutUsComponent } from './about-us/about-us.component';
import { CatalogoNegociosComponent } from './catalogo-negocios/catalogo-negocios.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NegocioComponent } from './negocio/negocio.component';
import { PagesComponent } from './pages.component';
import { ProductoComponent } from './producto/producto.component';


const routes: Routes = [

  // INICIO
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
    path: 'categorias/:categoria', component: CatalogoNegociosComponent
  },
  // CUENTA
  {
    path: 'cuenta', component: CuentaComponent,
    canLoad: [AuthGuard], canActivate: [AuthGuard]},
    // NEOGIO
  {
    path: 'negocio', component: NegocioComponent,
    canLoad: [AuthGuard], canActivate: [AuthGuard]
  },
  // PRODUCTO
  {
    path: 'producto', component: ProductoComponent,
    canLoad: [AuthGuard], canActivate: [AuthGuard]
  },
  // LOGIN
  {
    path: 'login', component: LoginComponent
  },
  // DEFAULT
  {
    path: '', redirectTo: 'inicio', pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
