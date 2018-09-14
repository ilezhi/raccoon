import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { TagRoutingModule } from './tag-routing.module'
import { TagComponent } from './tag.component'

import { SharedModule } from '../../module/shared.module'
// import { tagReducer } from '../../reducers'

@NgModule({
  imports: [
    SharedModule,
    // StoreModule.forFeature('tag', tagReducer),
    TagRoutingModule
  ],
  declarations: [TagComponent]
})
export class TagModule { }
