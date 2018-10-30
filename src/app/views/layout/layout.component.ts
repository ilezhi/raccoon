import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import * as UserAction from 'src/app/action/user.action'
import { WSService } from 'src/app/services/socket.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private store: Store<any>,
    private wss: WSService
  ) { }

  ngOnInit() {
    this.store.dispatch(new UserAction.Info())
    this.wss.topic$.subscribe(data => {
      console.log('subscribe', data)
    })

    this.wss.tag$.subscribe(data => {
      console.log('tag', data)
    })

    this.wss.conn.next({num: 9527})
  }

  onClick() {
    this.wss.conn.next("abc")
  }
}
