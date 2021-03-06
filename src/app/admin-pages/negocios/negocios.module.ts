import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NegociosRoutingModule } from './negocios-routing.module';
import { NegociosComponent } from './negocios.component';
import { ListaNegociosComponent } from './lista-negocios/lista-negocios.component';
import { NegocioComponent } from './negocio/negocio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SelectDropDownModule } from 'ngx-select-dropdown';

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
    FormsModule,
    NgxDatatableModule,
    RouterModule,
    SharedModule,
    CKEditorModule,
    NgxDropzoneModule,
    SelectDropDownModule,

  ]
})
export class NegociosModule { }
