import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { SharedModule } from '../../module/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component'

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent, ToolbarComponent]
})
export class HomeModule { }
