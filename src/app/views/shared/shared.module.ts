import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { SharedModule as EnjoyModule } from 'src/app/module/shared.module'
import { SharedRoutingModule } from './shared-routing.module'
import { SharedComponent } from './shared.component'
import { sharedReducer } from 'src/app/reducers'

@NgModule({
  imports: [
    EnjoyModule,
    StoreModule.forFeature('shared', sharedReducer),
    SharedRoutingModule
  ],
  declarations: [SharedComponent]
})
export class SharedModule { }
