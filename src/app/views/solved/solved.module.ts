import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { SolvedRoutingModule } from './solved-routing.module'
import { SolvedComponent } from './solved.component'

import { SharedModule } from '../../module/shared.module'
// import { solvedReducer } from '../../reducers'

@NgModule({
  imports: [
    SharedModule,
    // StoreModule.forFeature('solved', solvedReducer),
    SolvedRoutingModule
  ],
  declarations: [SolvedComponent]
})
export class SolvedModule { }
