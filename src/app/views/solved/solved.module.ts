import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolvedRoutingModule } from './solved-routing.module';
import { SolvedComponent } from './solved.component';

@NgModule({
  imports: [
    CommonModule,
    SolvedRoutingModule
  ],
  declarations: [SolvedComponent]
})
export class SolvedModule { }
