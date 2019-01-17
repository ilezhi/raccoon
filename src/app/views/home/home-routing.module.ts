import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home.component'
import { AllComponent } from './all/all.component'
import { AwesomeComponent } from './awesome/awesome.component'
import { DeptComponent } from './dept/dept.component'
import { TeamComponent } from './team/team.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'all',
        component: AllComponent
      },
      {
        path: 'awesome',
        component: AwesomeComponent
      },
      {
        path: 'department',
        component: DeptComponent
      },
      {
        path: 'team',
        component: TeamComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

}
