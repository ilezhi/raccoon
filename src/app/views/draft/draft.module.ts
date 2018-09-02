import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../module/shared.module';
import { DraftRoutingModule } from './draft-routing.module';
import { DraftComponent } from './draft.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DraftRoutingModule
  ],
  declarations: [DraftComponent]
})
export class DraftModule { }
