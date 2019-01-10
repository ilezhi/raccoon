import { Component, OnDestroy } from '@angular/core'
import { Observable, Subscription } from 'rxjs'

import { UserService } from '../../services/user.service'

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
    private us: UserService
  ) {
    this.sub = us.tags$
      .subscribe((tags: Tag[]) => {
        this.tags = tags
        this.tCount = tags.length
      })

    const childSub = us.categories$
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
