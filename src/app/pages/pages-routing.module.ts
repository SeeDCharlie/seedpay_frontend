import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';


const routes: Routes = [
 
      {
        path: 'inicio', component: HomeComponent
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
