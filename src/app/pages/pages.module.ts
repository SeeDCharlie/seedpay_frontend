import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ElementsModule } from '../elements/elements.module';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';




@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    LoginComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
