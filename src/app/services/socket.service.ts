import { Injectable } from '@angular/core'
import { webSocket } from 'rxjs/webSocket'
import { Observable, Subject, of, interval, timer, Subscription } from 'rxjs'
import { catchError } from 'rxjs/operators'

import * as utils from '../tools/util'
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
  private answer  = new Subject<TopicData>()

  private conn: any
  private user: User
  private count = 0

  private subConn: Subscription

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

  connect(user: User) {
    this.user = user
    this.ns.user = user
    const protocol = window.location.protocol.replace('http', 'ws')
    const host = window.location.host
    const conn = this.conn = webSocket(`${protocol}//${host}/ws/${user.id}`)

    this.subConn = conn.pipe(
      catchError(err => {
        console.log('ws connection failed.')
        this.connectionRetry()
        return of('error')
      })
    ).subscribe((res: any) => {
      if (res === 'error') {
        return
      }
      const { data, type, tag } = res
      if (tag === 'heartbeat') {
        return
      }

      const handle = utils.toFirstUpperCase(type)
      this[handle](data)
    })
  
    const sub2 = this.conn.multiplex(
      () => ({tag: 'heartbeat', text: 'ping'}),
      () => ({tag: 'heartbeat'}),
      (message: any) => message.tag === 'heartbeat'
    ).subscribe(_ => {
      if (this.count != 0) {
        this.count = 0
      }
    })

    this.subConn.add(sub2)
    this.heartbeatStart()
  }

  // 断线重连
  connectionRetry(maxRetryCount = 3, duration = 10000) {
    this.subConn.unsubscribe()
    const n = this.count
    if (n > maxRetryCount) {
      return
    }

    const t = n * n * duration
    this.count = n + 1
    timer(t).subscribe(_ => {
      this.connect(this.user)
    })
  }

  // 心跳检测, 用于保持连接
  heartbeatStart(duration = 30000) {
    const sub = interval(duration)
      .subscribe(_ => {
        this.conn.next('ping')
      })

    this.subConn.add(sub)
  }

  dispose() {
    this.subConn.unsubscribe()
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
