import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRoutingModule } from './my-routing.module';
import { MyComponent } from './my.component';

@NgModule({
  imports: [
    CommonModule,
    MyRoutingModule
  ],
  declarations: [MyComponent]
})
export class MyModule { }
