import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from 'src/app/module/shared.module'

import { LoginRoutingModule } from './login-routing.module'
import { LoginComponent } from './login.component'

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
