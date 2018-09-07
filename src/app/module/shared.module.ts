import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule }  from '@angular/forms'
import { RouterModule } from '@angular/router'

// 第三方模块
import { NgZorroAntdModule, NzMessageService } from 'ng-zorro-antd'

// 自定义指令
import { ToggleDirective } from '../directives/toggle.directive'

// 自定义组件
import { BodyComponent }   from '../layout/body/body.component'
import { FooterComponent } from '../layout/footer/footer.component'
import { HeaderComponent } from '../layout/header/header.component'
import { AsideComponent } from '../layout/aside/aside.component'
import { MainComponent } from '../layout/main/main.component'
import { ToolbarComponent } from '../components/toolbar/toolbar.component'
import { TableComponent } from '../components/table/table.component'

const comp = [
  HeaderComponent,
  BodyComponent,
  FooterComponent,
  AsideComponent,
  MainComponent,
  ToolbarComponent,
  TableComponent,
  ToggleDirective,
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule,
    FormsModule
  ],
  declarations: comp,
  exports: [
    CommonModule,
    NgZorroAntdModule,
    ...comp
  ],
  providers: [
    NzMessageService
  ]
})
export class SharedModule {
  name = '共享模块';
}
