import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MyComponent } from './my.component'

const routes: Routes = [
  {
    path: '', component: MyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRoutingModule { }
