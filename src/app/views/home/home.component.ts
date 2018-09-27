import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'

import { getUrl } from 'src/app/reducers'

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  url: string

  constructor(store: Store<any>) {
    store.pipe(
      select(getUrl)
    ).subscribe(url => {
      this.url = url
    })
  }

  ngOnInit() {
  }

}
