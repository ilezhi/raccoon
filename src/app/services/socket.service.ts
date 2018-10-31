import { Injectable } from '@angular/core'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class WSService {
  public topic$: Observable<any>
  public tag$: Observable<any>
  public conn: any
  private id: number

  constructor() {}

  connect(id) {
    this.id = id
    this.conn = webSocket(`ws://127.0.0.1:9000/ws/${id}`)

    this.topic$ = this.conn.multiplex(
      () => ({type: 'subscribe', tag: 'topic'}),
      () => ({type: 'unsubscribe', tag: 'topic'}),
      msg => {
        console.log(msg)
        return msg.type === 'topic'
      }
    )

    this.tag$ = this.conn.multiplex(
      () => ({type: 'subscribe', tag: 'tag'}),
      () => ({type: 'unsubscribe', tag: 'tag'}),
      msg => {
        return msg.type === 'tag'
      }
    )
  }
}