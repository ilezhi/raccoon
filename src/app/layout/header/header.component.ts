import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  user: User
  sub: Subscription

  constructor(private us: UserService) {
    this.sub = this.us.user$.subscribe(user => {
      this.user = user
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  // TODO: 退出登录
  logout() {

  }
}
