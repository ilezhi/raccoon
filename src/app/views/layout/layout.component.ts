import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { EMPTY as empty, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import * as UserAction from 'src/app/action/user.action'
import { WSService } from 'src/app/services/socket.service'
import { getInfo } from 'src/app/reducers/user.reducer'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private store: Store<any>,
    private wss: WSService,
    private userService: UserService
  ) {
    store.pipe(
      select(getInfo),
      switchMap(user => {
        if (!user || !user.id) {
          return this.userService.fetchLoginUser()
        }

        return of(user)
      })
    ).subscribe((user:any) => {
      if (user && user.id) {
        this.wss.connect(user.id)
        this.watch()
      }
    })
  }

  ngOnInit() {
    this.store.dispatch(new UserAction.Info())
  }

  watch() {
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
