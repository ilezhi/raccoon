import { NgModule }     from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared.module'

@NgModule({
  imports: [
    BrowserAnimationsModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ]
})
export class CoreModule {
  name = '核心模块';
}
