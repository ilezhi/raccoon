import { NgModule } from '@angular/core'

import { SharedModule } from '../../module/shared.module'
import { TopicRoutingModule } from './topic-routing.module'
import { TopicComponent } from './topic.component'

@NgModule({
  imports: [
    SharedModule,
    TopicRoutingModule
  ],
  declarations: [TopicComponent]
})
export class TopicModule { }
