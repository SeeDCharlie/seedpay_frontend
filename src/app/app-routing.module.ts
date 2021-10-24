import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '',
    loadChildren: () => import('./admin-pages/admin-pages.module').then(m => m.AdminPagesModule)
  },

  {
    path: '', redirectTo: '', pathMatch: 'full'
  },





];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {




}
