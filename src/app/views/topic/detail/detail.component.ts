import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap, concatMap, combineAll, take } from 'rxjs/operators';
import { EMPTY as empty, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getTopic } from '../../../reducers/entities.reducer';
import { TopicService } from '../../../services/topic.service';
import * as TopicAction from 'src/app/action/topic.action'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  topic: Topic

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
          take(1),
          select(getTopic(id)),
          switchMap((topic: Topic) => {
            if (topic) {
              return of(topic)
            }

            this.store.dispatch(new TopicAction.Detail(id))
            return empty
          })
        )
      })
    ).subscribe((topic: Topic) => {
      console.log(topic)
    })
  }

}
