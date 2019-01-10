import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { tagReducer } from 'src/app/reducers'

import { TagRoutingModule } from './tag-routing.module'
import { SharedModule } from 'src/app/module/shared.module'

import { TagComponent } from './tag.component'
import { ListComponent } from './list/list.component'

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('tag', tagReducer),
    TagRoutingModule
  ],
  declarations: [TagComponent, ListComponent]
})
export class TagModule { }
