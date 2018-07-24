import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/module/shared.module';
import { TopicRoutingModule } from './topic-routing.module';
import { TopicComponent } from './topic.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TopicRoutingModule
  ],
  declarations: [TopicComponent]
})
export class TopicModule { }
