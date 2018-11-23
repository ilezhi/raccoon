import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LayoutComponent } from './layout.component'

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '', loadChildren: () => import(/* webpackChunkName: "home" */ '../home/home.module').then(module => module['HomeModule'], () => { throw({loadChunkError: true})})
      },
      {
        path: 'my', loadChildren: () => import(/* webpackChunkName: "my" */ '../my/my.module').then(module => module['MyModule'], () => { throw({loadChunkError: true})})
      },
      {
        path: 'solved', loadChildren: () => import(/* webpackChunkName: "my" */ '../solved/solved.module').then(module => module['SolvedModule'], () => { throw({loadChunkError: true})})
      },
      {
        path: 'collection', loadChildren: () => import(/* webpackChunkName: "collection" */ '../collection/collection.module').then(module => module['CollectionModule'], () => { throw({loadChunkError: true})})
      },
      {
        path: 'project', loadChildren: '../project/project.module#ProjectModule'
      },
      {
        path: 'shared', loadChildren: () => import(/* webpackChunkName: "my" */ '../shared/shared.module').then(module => module['SharedModule'], () => { throw({loadChunkError: true})})
      },
      {
        path: 'tag', loadChildren: () => import(/* webpackChunkName: "my" */ '../tag/tag.module').then(module => module['TagModule'], () => { throw({loadChunkError: true})})
      },
      {
        path: 'draft', loadChildren: '../draft/draft.module#DraftModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
