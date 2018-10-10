import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/all', pathMatch: 'full'
  },
  {
    path: '', loadChildren: './views/layout/layout.module#LayoutModule',
  },
  {
    path: 'login',
    loadChildren: './views/login/login.module#LoginModule'
  },
  {
    path: 'topic',
    loadChildren: './views/topic/topic.module#TopicModule',
    outlet: 'slide'
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
