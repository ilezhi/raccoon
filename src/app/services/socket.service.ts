import { Injectable } from '@angular/core'
import { webSocket } from 'rxjs/webSocket'
import { Observable, Subject, of } from 'rxjs'

import * as utils from '../tools/util'
import { NotifyService } from './notify.service'
import { catchError } from 'rxjs/operators'
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
  private answer  = new Subject<TopicData>()

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

  get answer$(): Observable<TopicData> {
    return this.answer.asObservable()
  }

  constructor(
    private ns: NotifyService
  ) {}

  connect(user) {
    this.user = user
    this.ns.user = user
    const protocol = window.location.protocol.replace('http', 'ws')
    const host = window.location.host
    const conn = this.conn = webSocket(`${protocol}//${host}/ws/${user.id}`)
    conn.pipe(
      catchError(err => {
        console.log('ws connection failed')
        return of('')
      })
    ).subscribe((res: any) => {
      if (typeof res === 'string') {
        return
      }
      const { data, type, tag } = res

      if (tag === 'heartbeat') {
        return
      }

      const handle = utils.toFirstUpperCase(type)
      this[handle](data)
    })

    // const heartbeat$ = conn.multiplex(
    //   () => ({tag: 'heartbeat', text: 'ping'}),
    //   () => ({tag: 'heartbeat'}),
    //   (message: any) => message.tag === 'heartbeat'
    // )

    // heartbeat$.subscribe(message => {
    //   console.log('aaabbb', message)
    // })
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

  onAnswer(data: TopicData) {
    this.answer.next(data)
    this.ns.notify('answer', data)
  }
}
