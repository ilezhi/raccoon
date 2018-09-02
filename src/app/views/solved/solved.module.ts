import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolvedRoutingModule } from './solved-routing.module';
import { SolvedComponent } from './solved.component';
import { SharedModule } from '../../module/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SolvedRoutingModule
  ],
  declarations: [SolvedComponent]
})
export class SolvedModule { }
