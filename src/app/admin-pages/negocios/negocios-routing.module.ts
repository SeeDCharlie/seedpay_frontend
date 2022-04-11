import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaNegociosComponent } from './lista-negocios/lista-negocios.component';
import { NegocioComponent } from './negocio/negocio.component';
import { NegociosComponent } from './negocios.component';

const routes: Routes = [
  {
    path: '', component: NegociosComponent, children: [

      {
        path: 'lista', component: ListaNegociosComponent,    data: {
          breadcrumb: "Mis negocios"
        }
      },
      {
        path: 'negocio', component: NegocioComponent,    data: {
          breadcrumb: "Negocio"
        }
      },
      {
        path:'', redirectTo:'lista',  pathMatch: 'full'
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NegociosRoutingModule { }
