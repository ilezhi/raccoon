import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagRoutingModule } from './tag-routing.module';
import { TagComponent } from './tag.component';

@NgModule({
  imports: [
    CommonModule,
    TagRoutingModule
  ],
  declarations: [TagComponent]
})
export class TagModule { }
