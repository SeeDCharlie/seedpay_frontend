import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './components/products/products.module';
import { SalesModule } from './components/sales/sales.module';
import { CouponsModule } from './components/coupons/coupons.module';
import { PagesModule } from './components/pages/pages.module';
import { MediaModule } from './components/media/media.module';
import { MenusModule } from './components/menus/menus.module';
import { VendorsModule } from './components/vendors/vendors.module';
import { UsersModule } from './components/users/users.module';
import { LocalizationModule } from './components/localization/localization.module';
import { InvoiceModule } from './components/invoice/invoice.module';
import { SettingModule } from './components/setting/setting.module';;
import { ReportsModule } from './components/reports/reports.module';
import { AuthModule } from './components/auth/auth.module';
import { AdminpagesComponent } from './admin-pages.component';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarVentaComponent } from './registrar-venta/registrar-venta.component';
import { ProductoComponent } from './producto/producto.component';
import { NegocioComponent } from './negocio/negocio.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { InformeVentaComponent } from './informe-venta/informe-venta.component';

@NgModule({
  declarations: [
    AdminpagesComponent,
    RegistrarVentaComponent,
    ProductoComponent,
    NegocioComponent,
    CuentaComponent,
    InformeVentaComponent,

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminPagesRoutingModule,
    DashboardModule,
    InvoiceModule,
    SettingModule,
    ReportsModule,
    AuthModule,
    SharedModule,
    LocalizationModule,
    ProductsModule,
    SalesModule,
    VendorsModule,
    CouponsModule,
    PagesModule,
    MediaModule,
    MenusModule,
    UsersModule,
    SelectDropDownModule,
    PagesModule,

  ],
  providers: [],
  bootstrap: [AdminpagesComponent]
})

export class AdminPagesModule { }
