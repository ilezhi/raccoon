import { NgModule }     from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { httpInterceptorProviders } from '../config/interceptor.config'
import { SharedModule } from './shared.module'

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ],
  providers: [httpInterceptorProviders]
})
export class CoreModule {
  name = '核心模块';
}
