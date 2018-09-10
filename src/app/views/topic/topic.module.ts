import { NgModule } from '@angular/core'

import { MdEditorModule } from '../../components/md-editor/md-editor.module'

import { SharedModule } from '../../module/shared.module'
import { TopicRoutingModule } from './topic-routing.module'
import { TopicComponent } from './topic.component';
import { CreateComponent } from './create/create.component';
import { SearchTagComponent } from './components/search-tag/search-tag.component'

@NgModule({
  imports: [
    SharedModule,
    MdEditorModule,
    TopicRoutingModule
  ],
  declarations: [TopicComponent, CreateComponent, SearchTagComponent]
})
export class TopicModule { }
