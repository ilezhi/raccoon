import { Component } from '@angular/core'
import { Store } from '@ngrx/store'

import { getFull } from 'src/app/reducers'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(store: Store<any>) {
    store.select(getFull)
      .subscribe(data => {
        console.log('app', data)
      })
  }
  private name = 'app'
}
