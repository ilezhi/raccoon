import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'

import { getLoading } from 'src/app/reducers/global.reducer'

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading$: Observable<boolean>

  constructor(store: Store<any>) {
    this.loading$ = store.pipe(select(getLoading))
  }

  ngOnInit() {
  }

}
