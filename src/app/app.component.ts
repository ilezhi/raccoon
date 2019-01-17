import { Component } from '@angular/core'
import { Router, NavigationStart, NavigationEnd } from '@angular/router'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {
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
