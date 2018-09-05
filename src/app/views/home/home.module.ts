import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'

import { SharedModule } from '../../module/shared.module'
import { homeReducer } from '../../reducers'

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('home', homeReducer),
    HomeRoutingModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
