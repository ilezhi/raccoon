import { Injectable } from '@angular/core'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Observable, Subject } from 'rxjs'

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
  private id: number

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

  constructor() {}

  connect(id) {
    this.id = id
    const conn = this.conn = webSocket(`ws://127.0.0.1:9000/ws/${id}`)
    conn.subscribe((res: any) => {
      const { data, type } = res

      const handle = this.getHandle(type)
      this[handle](data)
    })
  }

  getHandle(type: string) {
    type = type.replace(/^\S/, s => s.toUpperCase())

    return 'on' + type
  }

  onTopic(topic: Topic) {
    this.topic.next(topic)
  }

  onComment(comment: Comment) {
    this.comment.next(comment)
  }

  onReply(reply: Reply) {
    this.reply.next(reply)
  }

  onLike(like: any) {
    this.like.next(like)
  }

  onFavor(favor: any) {
    this.favor.next(favor)
  }
}
