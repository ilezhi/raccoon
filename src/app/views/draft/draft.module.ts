import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { SharedModule } from '../../module/shared.module'
import { DraftRoutingModule } from './draft-routing.module'
import { DraftComponent } from './draft.component'
// import { draftReducer } from '../../reducers'

@NgModule({
  imports: [
    SharedModule,
    // StoreModule.forFeature('draft', draftReducer),
    DraftRoutingModule
  ],
  declarations: [DraftComponent]
})
export class DraftModule { }
