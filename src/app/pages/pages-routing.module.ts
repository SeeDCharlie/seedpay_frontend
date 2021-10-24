import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AboutUsComponent } from './about-us/about-us.component';
import { CatalogoNegociosComponent } from './catalogo-negocios/catalogo-negocios.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


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
    path: 'buscar', component: CatalogoNegociosComponent
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
