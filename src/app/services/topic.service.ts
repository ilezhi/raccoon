import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

import { Store } from '@ngrx/store'

import { Response } from 'src/app/types/global.type'
import { HttpService } from './http.service'
import { Topic } from 'src/app/models'
import { catchError, tap, map } from 'rxjs/operators'
import { AddTopicAction, CreateTopic } from 'src/app/action/entity.action'
@Injectable({
  providedIn: 'root'
})
export class TopicService {
  constructor(
    private store: Store<any>,
    private http: HttpService
  ) {}

  postTopic(params: TopicParams): Observable<Topic> {
    // const url = 'topic/create'
    // return this.http.post(url, params)
    //   .pipe(
    //     tap((res: Response) => {
    //       const { data } = res
    //       this.store.dispatch(new AddTopicAction({[data.id]: data}))
    //     }),
    //     map((res: Response) => res.data),
    //     catchError(_ => of(null))
    //   )
    const topic = {
      id: 1,
      title: '这是一个test',
      content: 'haha',
      tags: [1],
      view: 0
    }
    this.store.dispatch(new CreateTopic(topic))
    return of(topic)
  }
}

interface TopicParams {
  title: string
  projectID: number
  tags: number[]
}
