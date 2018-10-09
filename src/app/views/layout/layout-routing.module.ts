import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LayoutComponent } from './layout.component'

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '', loadChildren: '../home/home.module#HomeModule'
      },
      {
        path: 'my', loadChildren: '../my/my.module#MyModule'
      },
      {
        path: 'solved', loadChildren: '../solved/solved.module#SolvedModule'
      },
      {
        path: 'collection', loadChildren: '../collection/collection.module#CollectionModule'
      },
      {
        path: 'project', loadChildren: '../project/project.module#ProjectModule'
      },
      {
        path: 'shared', loadChildren: '../shared/shared.module#SharedModule'
      },
      {
        path: 'tag', loadChildren: '../tag/tag.module#TagModule'
      },
      {
        path: 'draft', loadChildren: '../draft/draft.module#DraftModule'
      },
      {
        path: 'topic',
        loadChildren: '../topic/topic.module#TopicModule',
        outlet: 'slide'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
