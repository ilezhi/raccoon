import { Injectable } from '@angular/core'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Observable, Subject } from 'rxjs'

import * as utils from 'src/app/tools/util'
import { NotifyService } from './notify.service'
@Injectable({
  providedIn: 'root'
})
export class WSService {
  private topic   = new Subject<Topic>()
  private comment = new Subject<TopicData>()
  private reply   = new Subject<TopicData>()
  private like    = new Subject<any>()
  private favor   = new Subject<any>()
  private top     = new Subject<Topic>()
  private awesome = new Subject<Topic>()

  private conn: any
  private user: User

  get topic$(): Observable<Topic> {
    return this.topic.asObservable()
  }

  get comment$(): Observable<TopicData> {
    return this.comment.asObservable()
  }

  get reply$(): Observable<TopicData> {
    return this.reply.asObservable()
  }

  get like$(): Observable<any> {
    return this.like.asObservable()
  }

  get favor$(): Observable<any> {
    return this.favor.asObservable()
  }

  get top$(): Observable<Topic> {
    return this.top.asObservable()
  }

  get awesome$(): Observable<Topic> {
    return this.awesome.asObservable()
  }

  constructor(
    private ns: NotifyService
  ) {}

  connect(user) {
    this.user = user
    this.ns.user = user
    const conn = this.conn = webSocket(`ws://127.0.0.1:9000/ws/${user.id}`)
    conn.subscribe((res: any) => {
      const { data, type } = res

      const handle = utils.toFirstUpperCase(type)
      this[handle](data)
    })
  }

  onTopic(topic: Topic) {
    this.topic.next(topic)
    this.ns.notify('topic', topic)
  }

  onComment(data: TopicData) {
    this.comment.next(data)
    this.ns.notify('comment', data)
  }

  onReply(data: TopicData) {
    this.reply.next(data)
    this.ns.notify('reply', data)
  }

  onLike(like: any) {
    this.like.next(like)
    this.ns.notify('like', like)
  }

  onFavor(favor: any) {
    this.favor.next(favor)
    this.ns.notify('favor', favor)
  }

  onTop(topic: Topic) {
    this.top.next(topic)
    this.ns.notify('top', topic)
  }

  onAwesome(topic: Topic) {
    this.awesome.next(topic)
    this.ns.notify('awesome', topic)
  }
}
