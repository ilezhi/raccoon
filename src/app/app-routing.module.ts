import { NgModule} from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from 'src/app/auth/auth.guard'

const routes: Routes = [
  {
    path: '', redirectTo: '/all', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './views/login/login.module#LoginModule'
  },
  {
    path: 'topic',
    loadChildren: './views/topic/topic.module#TopicModule',
    outlet: 'slide',
    data: {
      preload: true
    }
  },
  {
    path: '', loadChildren: './views/layout/layout.module#LayoutModule',
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
