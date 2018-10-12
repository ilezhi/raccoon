import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import * as UserAction from 'src/app/action/user.action' 

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.store.dispatch(new UserAction.Info())
  }

}
