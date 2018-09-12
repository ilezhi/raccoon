import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { Subscription } from 'rxjs' 

import { AllTopicsAction } from '../../action/home.action'
import { getAll } from '../../reducers/home.reducer'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private sb: Subscription
  all = {}

  constructor(private store: Store<any>) {
    this.sb = store.pipe(select(getAll))
      .subscribe(all => {
        console.log(all, 'haha')
        this.all = all
      })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sb.unsubscribe()
  }

  onFilterByDate(n) {
    // const topic = {
    //   time: 20180909,
    //   page: 1,
    //   size: 50,
    //   total: 100,
    //   filter: ''
    // }

    // this.store.dispatch(new AllTopicsAction(topic))
  }

}
