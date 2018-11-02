import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Subscription, Observable, EMPTY as empty } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { TopicService } from 'src/app/services/topic.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  topics$: Observable<Topic>
  private sub: Subscription

  constructor(
    private route: ActivatedRoute,
    private ts: TopicService,
    private us: UserService
  ) { }

  ngOnInit() {
    const { route, us } = this
    this.topics$ = route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const name = params.get('name')

        return us.category$(name).pipe(
          switchMap((c: Category) => {
            console.log(c)
            return empty
          })
        )
      })
    )
  }

}
