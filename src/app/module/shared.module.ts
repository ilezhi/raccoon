import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdEditorComponent } from 'src/app/components/md-editor/md-editor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MdEditorComponent
  ],
  exports: [
    MdEditorComponent
  ]
})
export class SharedModule {
  name = '共享模块';
}
