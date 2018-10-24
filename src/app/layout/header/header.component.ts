import { Component } from '@angular/core'
import { Store, select } from '@ngrx/store'

import { UserService } from 'src/app/services/user.service'
import { User } from 'src/app/models'
import { getInfo } from 'src/app/reducers/user.reducer'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: User
  constructor(
    private store: Store<any>
  ) {
    store.pipe(
      select(getInfo)
    ).subscribe(user => {
      this.user = user
    })
  }
}
