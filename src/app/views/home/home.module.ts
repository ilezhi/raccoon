import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'

import { SharedModule } from '../../module/shared.module'
import { homeReducer } from '../../reducers';
import { AwesomeComponent } from './awesome/awesome.component';
import { AllComponent } from './all/all.component';
import { DeptComponent } from './dept/dept.component';
import { TeamComponent } from './team/team.component'

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('home', homeReducer),
    HomeRoutingModule
  ],
  declarations: [HomeComponent, AwesomeComponent, AllComponent, DeptComponent, TeamComponent]
})
export class HomeModule { }
