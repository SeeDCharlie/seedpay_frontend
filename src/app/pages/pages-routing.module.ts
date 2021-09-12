import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
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
