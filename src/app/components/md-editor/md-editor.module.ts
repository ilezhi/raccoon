import { NgModule }     from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule }  from '@angular/forms'

import { PanelEditComponent }     from './components/panel-edit/panel-edit.component'
import { PanelViewComponent }     from './components/panel-view/panel-view.component'
import { ToolbarLeftComponent }   from './components/toolbar-left/toolbar-left.component'
import { ToolbarRightComponent }  from './components/toolbar-right/toolbar-right.component'
import { MdEditorComponent }      from './md-editor.component'
import { LayoutTip }              from './pipes/layout-tip.pipe'
import { ParseMD }                from './pipes/parse-md.pipe'
import { EditorService }          from './services/editor.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    MdEditorComponent,
    ToolbarLeftComponent,
    ToolbarRightComponent,
    PanelEditComponent,
    PanelViewComponent,
    LayoutTip,
    ParseMD,
  ],
  exports: [
    MdEditorComponent,
    ParseMD
  ],
  providers: [EditorService]
})
export class MdEditorModule {

}
