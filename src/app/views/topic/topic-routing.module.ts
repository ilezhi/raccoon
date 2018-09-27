import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TopicComponent } from './topic.component'
import { CreateComponent } from './create/create.component'
import { DetailComponent } from './detail/detail.component'

const routes: Routes = [
  {
    path: '',
    component: TopicComponent,
    children: [
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: ':id',
        component: DetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }
