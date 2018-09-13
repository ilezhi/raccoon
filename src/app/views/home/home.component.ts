import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { Subscription } from 'rxjs' 

import { AllTopicsAction } from '../../action/home.action'
import { getAll } from '../../reducers/home.reducer'
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { switchMap, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private sb: Subscription
  all = {}
  private type: string

  constructor(
    store: Store<any>,
    route: ActivatedRoute,
    router: Router
  ) {
    this.sb = store.pipe(select(getAll))
      .subscribe(all => {
        this.all = all
      })

    const subRouter = router.events.pipe(
      filter(ev => ev instanceof NavigationEnd),
      map((data: NavigationEnd) => data.url.slice(1))
    ).subscribe((url: string) => {
      this.type = url || 'all'
    })

    this.sb.add(subRouter)
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
