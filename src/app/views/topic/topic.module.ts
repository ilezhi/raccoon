import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdEditorModule  } from '../../components/md-editor/md-editor.module';
import { TopicRoutingModule } from './topic-routing.module';
import { TopicComponent } from './topic.component';

@NgModule({
  imports: [
    CommonModule,
    MdEditorModule,
    TopicRoutingModule
  ],
  declarations: [TopicComponent]
})
export class TopicModule { }
