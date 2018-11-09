import { Injectable } from '@angular/core'
import { Route, Router, CanLoad } from '@angular/router'

import { UserService } from 'src/app/services/user.service'
import * as utils from 'src/app/tools/util'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private us: UserService, private router: Router) {}

  canLoad(route: Route): boolean {
    let url = `/${route.path}`

    return this.checkLogin()
  }

  checkLogin(): boolean {
    if (this.us.isLoggedIn) {
      return true
    }

    const user = utils.storage('user')
    if (user) {
      return true
    }

    this.router.navigate(['/login'])
    return false
  }
}
