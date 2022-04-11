import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NegociosRoutingModule } from './negocios-routing.module';
import { NegociosComponent } from './negocios.component';
import { ListaNegociosComponent } from './lista-negocios/lista-negocios.component';
import { NegocioComponent } from './negocio/negocio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { FeatherIconsComponent } from '../shared/components/feather-icons/feather-icons.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NegociosComponent,
    ListaNegociosComponent,
    NegocioComponent
  ],
  imports: [
    CommonModule,
    NegociosRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    RouterModule,
    SharedModule
  ]
})
export class NegociosModule { }
