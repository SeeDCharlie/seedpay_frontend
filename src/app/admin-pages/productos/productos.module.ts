import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ProductoComponent } from './producto/producto.component';
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
    ProductosComponent,
    ListaProductosComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
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
export class ProductosModule { }
