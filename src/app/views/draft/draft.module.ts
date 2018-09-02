import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DraftRoutingModule } from './draft-routing.module';
import { DraftComponent } from './draft.component';

@NgModule({
  imports: [
    CommonModule,
    DraftRoutingModule
  ],
  declarations: [DraftComponent]
})
export class DraftModule { }
