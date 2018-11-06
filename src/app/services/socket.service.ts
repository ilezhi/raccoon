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
  private comment = new Subject<Comment>()
  private reply   = new Subject<Reply>()
  private like    = new Subject<any>()
  private favor   = new Subject<any>()

  private conn: any
  private user: User

  get topic$(): Observable<Topic> {
    return this.topic.asObservable()
  }

  get comment$(): Observable<Comment> {
    return this.comment.asObservable()
  }

  get reply$(): Observable<Reply> {
    return this.reply.asObservable()
  }

  get like$(): Observable<any> {
    return this.like.asObservable()
  }

  get favor$(): Observable<any> {
    return this.favor.asObservable()
  }

  constructor(
    private ns: NotifyService
  ) {}

  connect(user) {
    this.user = user
    this.ns.user = user
    const conn = this.conn = webSocket(`ws://172.18.2.231:9000/ws/${user.id}`)
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

  onComment(comment: Comment) {
    this.comment.next(comment)
    this.ns.notify('comment', comment)
  }

  onReply(reply: Reply) {
    this.reply.next(reply)
    this.ns.notify('reply', reply)
  }

  onLike(like: any) {
    this.like.next(like)
    this.ns.notify('like', like)
  }

  onFavor(favor: any) {
    this.favor.next(favor)
    this.ns.notify('favor', favor)
  }
}
