import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { SharedModule } from '../../module/shared.module'
import { MyRoutingModule } from './my-routing.module'
import { MyComponent } from './my.component'
// import { myReducer } from '../../reducers'

@NgModule({
  imports: [
    SharedModule,
    // StoreModule.forFeature('my', myReducer),
    MyRoutingModule
  ],
  declarations: [MyComponent]
})
export class MyModule { }
