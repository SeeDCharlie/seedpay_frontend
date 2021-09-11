import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  //INICIO
  {
    path: 'inicio',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '**',
    redirectTo: 'inicio'
  },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {




}
