import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdEditorComponent }      from '../components/md-editor/md-editor.component';
import { ToolbarLeftComponent }   from '../components/md-editor/toolbar-left/toolbar-left.component';
import { ToolbarRightComponent }  from '../components/md-editor/toolbar-right/toolbar-right.component';
import { PanelEditComponent }     from '../components/md-editor/panel-edit/panel-edit.component';
import { PanelViewComponent }      from '../components/md-editor/panel-view/panel-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MdEditorComponent,
    ToolbarLeftComponent,
    ToolbarRightComponent,
    PanelEditComponent,
    PanelViewComponent
  ],
  exports: [
    MdEditorComponent
  ]
})
export class SharedModule {
  name = '共享模块';
}
