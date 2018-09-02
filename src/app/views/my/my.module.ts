import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../module/shared.module';
import { MyRoutingModule } from './my-routing.module';
import { MyComponent } from './my.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MyRoutingModule
  ],
  declarations: [MyComponent]
})
export class MyModule { }
