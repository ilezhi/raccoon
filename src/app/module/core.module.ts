import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// 第三方模块
import { NgZorroAntdModule, NzMessageService } from 'ng-zorro-antd';

// 自定义组件
import { BodyComponent }   from 'src/app/layout/body/body.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    NgZorroAntdModule
  ],
  declarations: [
    HeaderComponent,
    BodyComponent,
    FooterComponent
  ],
  exports: [
    FormsModule,
    NgZorroAntdModule,
    HeaderComponent,
    BodyComponent,
    FooterComponent
  ],
  providers: [
    NzMessageService
  ]
})
export class CoreModule {
  name = '核心模块';
}
