import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { tap, switchMap } from 'rxjs/operators'

import { Topic } from 'src/app/models'
import { getAll } from 'src/app/reducers/home.reducer'
import { getLoading } from 'src/app/reducers/global.reducer'
import { Topics } from 'src/app/action/topic.action'
import { AllSuccess } from 'src/app/action/home.action'

@Component({
  selector: 'app-all',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  topics$: Observable<Topic[]>

  constructor(private store: Store<any>) {
    this.topics$ = store.select(getAll)
      .pipe(
        tap(data => {
          if (!data) {
            store.dispatch(new Topics({type: 'all', Action: AllSuccess}))
          }
        })
      )
  }
  
  ngOnInit() {
  }
}
