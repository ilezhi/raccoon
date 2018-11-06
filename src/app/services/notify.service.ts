import { Injectable } from '@angular/core'

import * as utils from 'src/app/tools/util'

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private granted: boolean
  private title = '系统通知'

  public user: User

  constructor() {
    this.init()
  }
  
  async init() {
    let granted = (Notification as any).permission
    if (granted === 'default') {
      granted = await Notification.requestPermission()
    }

    this.granted = granted === 'granted'
  }

  async notify(tag: string, data: any) {
    if (!this.granted) {
      return
    }

    const handle = utils.toFirstUpperCase(tag)
    const { avatar, body } = this[handle](data)
    const { title } = this

    new Notification(title, {
      tag: tag,
      icon: avatar,
      body: body
    })
  }

  onTopic(topic: Topic) {
    const { avatar, createdAt, updatedAt, favor, nickname, title } = topic
    let body = nickname
    if (createdAt === updatedAt) {
      // 新增
      if (favor) {
        body += `分享了文章<<${title}>>`
      } else {
        body += `有一个提问<<${title}>>等您来回答`
      }
    } else {
      if (favor) {
        body += `更新了文章<<${title}>>`
      } else {
        body += `更新了提问<<${title}>>`
      }
    }

    return {
      avatar, body
    }
  }

  onComment(comment: Comment) {
    const { user } = this
    const { avatar, nickname, title, rid, shared } = comment
    let body = ''

    const tag = shared ? '分享' : '提问'

    if (user.id !== rid) {
      return
    }
  
    body = `${nickname}回复了您的${tag}<<${title}>>`

    return {avatar, body }
  }

  onReply(reply: Reply) {
    const { user: { id } } = this
    const { avatar, nickname, receiverID, rid, shared, title } = reply
    // 通知回复的人, 和帖子作者
    let body = ''
    const tag = shared ? '分享' : '提问'
    if (id == receiverID) {
      body = `${nickname}在<<${title}>>回复了您`
    } else if (id === rid ) {
      body = `您的${tag}<<${title}>>中有新的回复`
    }
    return { avatar, body }
  }

  onFavor() {
    return {}
  }

  onLike() {
    return {}
  }
}
