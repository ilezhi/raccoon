import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/all', pathMatch: 'full'
  },
  {
    path: '', loadChildren: './views/home/home.module#HomeModule'
  },
  {
    path: 'my', loadChildren: './views/my/my.module#MyModule'
  },
  {
    path: 'solved', loadChildren: './views/solved/solved.module#SolvedModule'
  },
  {
    path: 'collection', loadChildren: './views/collection/collection.module#CollectionModule'
  },
  {
    path: 'project', loadChildren: './views/project/project.module#ProjectModule'
  },
  {
    path: 'shared', loadChildren: './views/shared/shared.module#SharedModule'
  },
  {
    path: 'tag', loadChildren: './views/tag/tag.module#TagModule'
  },
  {
    path: 'draft', loadChildren: './views/draft/draft.module#DraftModule'
  },
  {
    path: 'topic',
    loadChildren: './views/topic/topic.module#TopicModule',
    outlet: 'slide'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
