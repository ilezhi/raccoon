import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MyComponent } from './my.component'
import { MySuccess } from 'src/app/action/my.action'

const routes: Routes = [
  {
    path: '', component: MyComponent,
    data: {
      page: 'my',
      action: MySuccess
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRoutingModule { }
