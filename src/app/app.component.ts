import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'

import { getState, getUrl } from 'src/app/reducers'
import { Router, NavigationStart, NavigationEnd } from '@angular/router'

import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private name = 'app'

  constructor(store: Store<any>, private router: Router) {
    store.select(getState)
      .subscribe(data => {
        console.log('app', data)
      })

    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        NProgress.start()
      }

      if (ev instanceof NavigationEnd) {
        NProgress.done()
      }
    })
  }
}
