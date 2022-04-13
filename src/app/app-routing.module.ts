import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '',
    loadChildren: () => import('./admin-pages/admin-pages.module').then(m => m.AdminPagesModule),

  },

  {
    path: '', redirectTo: 'inicio', pathMatch: 'full'
  },


  { path: 'ventas', loadChildren: () => import('./admin-pages/ventas/ventas.module').then(m => m.VentasModule) },




];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {




}
