import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Store } from '@ngrx/store'

import { Topics } from 'src/app/action/topic.action'
import { getAwesome } from 'src/app/reducers/home.reducer'
import { AwesomeSuccess } from 'src/app/action/home.action'
@Component({
  selector: 'app-awesome',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './awesome.component.html',
  styleUrls: ['./awesome.component.scss']
})
export class AwesomeComponent implements OnInit {
  topics$: Observable<Topic[]>

  constructor(private store: Store<any>) {
    this.topics$ = store.select(getAwesome)
      .pipe(
        tap(data => {
          if (!data) {
            store.dispatch(new Topics({type: 'awesome', Action: AwesomeSuccess}))
          }
        })
      )
  }

  ngOnInit() {
  }
}
