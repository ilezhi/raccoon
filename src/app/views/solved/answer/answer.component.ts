import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'

import { Topics } from 'src/app/action/topic.action'
import { ATopicsSuccess } from 'src/app/action/solved.action'
import { getATopics } from 'src/app/reducers/solved.reducer'

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  topics$: Observable<Topic[]>

  constructor(store: Store<any>) {
    this.topics$ = store.pipe(
      select(getATopics),
      tap(data => {
        if (!data) {
          store.dispatch(new Topics({type: 'answer', Action: ATopicsSuccess}))
        }
      })
    )
  }

  ngOnInit() {
  }

}
