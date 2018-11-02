import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionComponent } from './collection.component'
import { ListComponent } from './list/list.component'

const routes: Routes = [
  {
    path: '', component: CollectionComponent,
    children: [
      {
        path: ':name', component: ListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }
