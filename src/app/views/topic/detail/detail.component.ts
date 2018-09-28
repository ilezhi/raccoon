import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { map, switchMap, concatMap, combineAll, take } from 'rxjs/operators'
import { EMPTY as empty, of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import { getTopic } from '../../../reducers/entities.reducer'
import { TopicService } from '../../../services/topic.service'
import * as TopicAction from 'src/app/action/topic.action'
import { slideComt } from 'src/app/animations/slide'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [slideComt]
})
export class DetailComponent implements OnInit {
  topic: Topic
  hide: string
  done: boolean
  isParse = true

  constructor(
    private route: ActivatedRoute,
    private store: Store<Entities<Topic>>,
    private topicService: TopicService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = +params.get('id')
        return this.store.pipe(
          select(getTopic(id)),
          switchMap((topic: Topic) => {
            if (topic) {
              return of(topic)
            }

            // this.store.dispatch(new TopicAction.Detail(id))
            return empty
          })
        )
      })
    ).subscribe((topic: Topic) => {
      this.topic = topic
    })
  }

  toggle() {
    this.done = false
    this.hide = this.hide === 'hide' ? '' : 'hide'
  }

  toggleDone() {
    this.done = !!this.hide
  }

  close() {
    this.topicService.close()
  }
}
