import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';

import { PanelEditComponent }     from './components/panel-edit/panel-edit.component';
import { PanelViewComponent }     from './components/panel-view/panel-view.component';
import { ToolbarLeftComponent }   from './components/toolbar-left/toolbar-left.component';
import { ToolbarRightComponent }  from './components/toolbar-right/toolbar-right.component';
import { MdEditorComponent }      from './md-editor.component';
import { Pretty }                 from './pipes/pretty.pipe';
import { EditorService }          from './services/editor.service';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    MdEditorComponent,
    ToolbarLeftComponent,
    ToolbarRightComponent,
    PanelEditComponent,
    PanelViewComponent,
    Pretty
  ],
  exports: [
    MdEditorComponent
  ],
  providers: [EditorService]
})
export class MdEditorModule {

}
