import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { SharedModule } from '../../module/shared.module'
import { CollectionRoutingModule } from './collection-routing.module'
import { CollectionComponent } from './collection.component'
import { collectionReducer } from '../../reducers'
import { ListComponent } from './list/list.component'

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('collection', collectionReducer),
    CollectionRoutingModule
  ],
  declarations: [CollectionComponent, ListComponent]
})
export class CollectionModule { }
