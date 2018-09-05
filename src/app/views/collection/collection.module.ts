import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { SharedModule } from '../../module/shared.module'
import { CollectionRoutingModule } from './collection-routing.module'
import { CollectionComponent } from './collection.component'
import { collectionReducer } from '../../reducers'

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('collection', collectionReducer),
    CollectionRoutingModule
  ],
  declarations: [CollectionComponent]
})
export class CollectionModule { }
