import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { NgZorroAntdModule, NzMessageService } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule
  ],
  providers: [
    NzMessageService
  ]
})
export class CoreModule {
  name = '核心模块';
}
