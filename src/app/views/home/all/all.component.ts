import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { Topic } from 'src/app/models'
import { getAll } from 'src/app/reducers/home.reducer'

@Component({
  selector: 'app-all',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  topics$: Observable<Topic[]>

  constructor(private store: Store<any>) {
    this.topics$ = store.pipe(select(getAll))
    store.pipe(select('entities'))
      .subscribe(data => {
        console.log('home entities', data)
      })
  }

  ngOnInit() {
  }

}
