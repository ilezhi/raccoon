import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { SharedModule } from '../../module/shared.module'
import { ProjectRoutingModule } from './project-routing.module'
import { ProjectComponent } from './project.component'
import { projectReducer } from '../../reducers'

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('project', projectReducer),
    ProjectRoutingModule
  ],
  declarations: [ProjectComponent]
})
export class ProjectModule { }
