import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule }  from '@angular/forms'
import { RouterModule } from '@angular/router'

// 第三方模块
import { NgZorroAntdModule, NzMessageService } from 'ng-zorro-antd'

// 自定义指令
import { ToggleDirective } from '../directives/toggle.directive'
import { LoadingDirective } from '../directives/loading.directive'
// 自定义组件
import { BodyComponent }   from '../layout/body/body.component'
import { FooterComponent } from '../layout/footer/footer.component'
import { HeaderComponent } from '../layout/header/header.component'
import { AsideComponent } from '../layout/aside/aside.component'
import { MainComponent } from '../layout/main/main.component'
import { TableComponent } from '../components/table/table.component'
import { TagComponent } from '../components/tag/tag.component'

import { Count } from 'src/app/pipes/count.pipe'
import { Ago } from 'src/app/pipes/moment.pipe'

const comp = [
  HeaderComponent,
  BodyComponent,
  FooterComponent,
  AsideComponent,
  MainComponent,
  TableComponent,
  ToggleDirective,
  LoadingDirective,
  TagComponent,
  Count,
  Ago
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: comp,
  exports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    ...comp
  ],
  providers: [
    NzMessageService
  ]
})
export class SharedModule {
  name = '共享模块';
}
