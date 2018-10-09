import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/all', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './views/login/login.module#LoginModule'
  },
  {
    path: '', loadChildren: './views/layout/layout.module#LayoutModule',
  },
  {
    path: '**',
    redirectTo: '/all'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
