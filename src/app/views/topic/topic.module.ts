import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicRoutingModule } from './topic-routing.module';
import { TopicComponent } from './topic.component';

@NgModule({
  imports: [
    CommonModule,
    TopicRoutingModule
  ],
  declarations: [TopicComponent]
})
export class TopicModule { }
