import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NegocioComponent } from './negocio/negocio.component';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  // Inicio
  {
    path: 'inicio', component: HomeComponent
  },
  // Login
  {
    path: 'login', component: LoginComponent
  },
  // Cuenta
  {
    path: 'cuenta', component: CuentaComponent
  },
  // Negocio
  {
    path: 'negocio', component: NegocioComponent
  },
  {
    path: 'aboutus', component: AboutUsComponent
  },
  // Default inicio
  {
    path: '', redirectTo: 'inicio', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
