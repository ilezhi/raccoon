import { Component, Input } from '@angular/core'
import { Topic } from 'src/app/models'
import { Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { getLoading } from '../../reducers/global.reducer'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  loading$: Observable<boolean>
  @Input() data: Topic[] = []

  constructor(
    store: Store<any>
  ) {
    this.loading$ = store.pipe(select(getLoading))
  }
}
