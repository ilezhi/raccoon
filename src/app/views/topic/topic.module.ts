import { NgModule } from '@angular/core'

import { MdEditorModule } from '../../components/md-editor/md-editor.module'

import { SharedModule } from '../../module/shared.module'
import { TopicRoutingModule } from './topic-routing.module'

import { SelectedTagComponent } from './components/selected-tag/selected-tag.component'
import { CommentComponent } from './components/comment/comment.component'
import { CommentListComponent } from './components/comment-list/comment-list.component'
import { CommentItemComponent } from './components/comment-item/comment-item.component'

import { TopicComponent } from './topic.component'
import { CreateComponent } from './create/create.component'
import { DetailComponent } from './detail/detail.component'
import { FavorModalComponent } from './components/favor-modal/favor-modal.component';
import { EditComponent } from './edit/edit.component'

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
    CommentComponent,
    CommentListComponent,
    CommentItemComponent,
    FavorModalComponent,
    EditComponent,
  ]
})
export class TopicModule { }
