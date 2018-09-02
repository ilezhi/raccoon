import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule as EnjoyModule } from '../../module/shared.module'
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';

@NgModule({
  imports: [
    CommonModule,
    EnjoyModule,
    SharedRoutingModule
  ],
  declarations: [SharedComponent]
})
export class SharedModule { }
