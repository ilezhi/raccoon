import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { select, Store } from '@ngrx/store'

import { tap } from 'rxjs/operators'
import { Topics } from 'src/app/action/topic.action'
import { MySuccess } from 'src/app/action/my.action'
import { getMyTopics } from 'src/app/reducers/my.reducer'

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss']
})
export class MyComponent implements OnInit {
  topics$: Observable<Topic[]>

  constructor(store: Store<any>) {
    this.topics$ = store.pipe(
      select(getMyTopics),
      tap(data => {
        if (!data) {
          console.log(data)
          store.dispatch(new Topics({type: 'my', Action: MySuccess}))
        }
      })
    )
  }

  ngOnInit() {
  }

}
