import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'

import { Topics } from 'src/app/action/topic.action'
import { QTopicsSuccess } from 'src/app/action/solved.action'
import { getQTopics } from 'src/app/reducers/solved.reducer'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  topics$: Observable<Topic[]>

  constructor(store: Store<any>) {
    this.topics$ = store.pipe(
      select(getQTopics),
      tap(data => {
        if (!data) {
          store.dispatch(new Topics({type: 'question', Action: QTopicsSuccess}))
        }
      })
    )
  }

  ngOnInit() {
  }

}
