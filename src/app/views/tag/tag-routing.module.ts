import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TagComponent } from './tag.component'
import { ListComponent } from './list/list.component'

const routes: Routes = [
  {
    path: '', component: TagComponent,
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
export class TagRoutingModule { }
