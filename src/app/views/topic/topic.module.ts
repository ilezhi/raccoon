import { NgModule } from '@angular/core'

import { SharedModule } from '../../module/shared.module'
import { TopicRoutingModule } from './topic-routing.module'
import { TopicComponent } from './topic.component';
import { CreateComponent } from './create/create.component'

@NgModule({
  imports: [
    SharedModule,
    TopicRoutingModule
  ],
  declarations: [TopicComponent, CreateComponent]
})
export class TopicModule { }
