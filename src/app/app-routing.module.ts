import { NgModule} from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from 'src/app/auth/auth.guard'

const routes: Routes = [
  {
    path: '', redirectTo: '/all', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import(/* webpackChunkName: "login" */ './views/login/login.module').then(module => module['LoginModule'], () => { throw({loadChunkError: true})})
  },
  {
    path: 'topic',
    loadChildren: () => import(/* webpackChunkName: "topic" */ './views/topic/topic.module').then(module => module['TopicModule'], () => { throw({loadChunkError: true})}),
    outlet: 'slide',
    data: {
      preload: true
    }
  },
  {
    path: '', loadChildren: () => import(/* webpackChunkName: "home" */ './views/layout/layout.module').then(module => module['LayoutModule'], () => { throw({loadChunkError: true})}),
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/all'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
