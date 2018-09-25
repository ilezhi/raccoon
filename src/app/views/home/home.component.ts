import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getLoading } from '../../reducers/global.reducer';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>

  constructor(private store: Store<any>) {
    this.loading$ = store.select(getLoading)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  onFilterByDate(n) {
  }

}
