import { NgModule } from '@angular/core'

import { MdEditorModule } from '../../components/md-editor/md-editor.module'

import { SharedModule } from '../../module/shared.module'
import { TopicRoutingModule } from './topic-routing.module'
import { TopicComponent } from './topic.component'
import { CreateComponent } from './create/create.component'
import { SelectedTagComponent } from './components/selected-tag/selected-tag.component';
import { DetailComponent } from './detail/detail.component'

@NgModule({
  imports: [
    MdEditorModule,
    SharedModule,
    TopicRoutingModule
  ],
  declarations: [
    TopicComponent,
    CreateComponent,
    SelectedTagComponent,
    DetailComponent,
  ]
})
export class TopicModule { }
