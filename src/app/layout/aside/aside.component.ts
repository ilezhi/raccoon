import { Component, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'

import { getTags, getCategory } from 'src/app/reducers/user.reducer'

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnDestroy {
  showTags = 0;
  tags: Array<Tag>
  categories: Array<Category>
  cCount: number
  tCount: number

  private sub: Subscription

  constructor(
    private store: Store<any>
  ) {
    this.sub = store.pipe(select(getTags))
      .subscribe(tags => {
        this.tags = tags
        this.tCount = tags.length
      })

    const childSub = store.pipe(select(getCategory))
      .subscribe(categories => {
        this.categories = categories
        this.cCount = categories.length
      })

    this.sub.add(childSub)
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  onToggleTags() {
    this.showTags ^= 1;
  }
}
