import { Component, OnInit } from '@angular/core'
import { normalize } from 'normalizr'

import { WSService } from 'src/app/services/socket.service'
import { UserService } from 'src/app/services/user.service'
import { TopicService } from 'src/app/services/topic.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private wss: WSService,
    private us: UserService,
    private ts: TopicService
  ) {
    us.user$.subscribe((user:any) => {
      if (user && user.id) {
        this.wss.connect(user)
        this.watch()
      }
    })
  }

  ngOnInit() {
    this.us.fetchInfo().subscribe()
  }

  watch() {
    this.wss.topic$.subscribe(data => {
      this.ts.dispatch(data)
    })

    this.wss.comment$.subscribe(data => {
      this.ts.dispatchComment(data)
    })

    this.wss.reply$.subscribe(data => {
      this.ts.dispatchReply(data)
    })
  }
}
