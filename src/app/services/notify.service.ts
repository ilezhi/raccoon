import { Injectable } from '@angular/core'

import * as utils from '../tools/util'

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
    const { avatar, body, cancel } = this[handle](data)
    if (cancel) {
      return
    }

    const { title } = this

    new Notification(title, {
      tag: tag,
      icon: avatar,
      body: body
    })
  }

  onTopic(topic: Topic) {
    const { avatar, createdAt, updatedAt, shared, nickname, title } = topic
    let body = nickname

    let type = shared ? '分享' : '提问'

    if (createdAt === updatedAt) {
      // 新增
      if (shared) {
        body += `${type}了文章<<${title}>>`
      } else {
        body += `有一个${type}<<${title}>>等您来回答`
      }
    } else {
      if (shared) {
        body += `更新了分享<<${title}>>`
      } else {
        body += `更新了提问<<${title}>>`
      }
    }


    return {
      avatar, body
    }
  }

  onComment(data: TopicData) {
    const { user } = this
    const { avatar, nickname, title, rid, shared } = data.comment
    let body = ''

    const tag = shared ? '分享' : '提问'

    if (user.id !== rid) {
      return
    }
  
    body = `${nickname}回复了您的${tag}<<${title}>>`

    return {avatar, body }
  }

  onReply(data: TopicData) {
    const { user: { id } } = this
    const { avatar, nickname, receiverID, rid, shared, title } = data.reply
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

  onFavor(data: any) {
    const { user: { id } } = this
    const { authorID, title, isFavor, shared, nickname, avatar } = data

    if (id !== authorID) {
      return { cancel: true }
    }

    const tag = shared ? '分享' : '提问'
    const action = isFavor ? '收藏了' : '已取消收藏'
    const body = `${nickname}${action}您的${tag}<<${title}>>`

    return { avatar, body }
  }

  onLike(data: any) {
    const { user: { id } } = this
    const { authorID, title, isLike, shared, nickname, avatar } = data

    if (id !== authorID) {
      return { cancel: true }
    }

    const tag = shared ? '分享' : '提问'
    const action = isLike ? '点赞了' : '已取消点赞'
    const body = `${nickname}${action}您的${tag}<<${title}>>`

    return { avatar, body }
  }

  onTop(topic: Topic) {
    const { title, top, avatar } = topic

    if (!top) {
      return { cancel: true }
    }

    const body = `管理员置顶了<<${title}>>`
    return { avatar, body }
  }

  onAwesome(topic: Topic) {
    const { user: { id } } = this
    const { authorID, title, awesome, avatar } = topic

    if (!awesome) {
      return { cancel: true }
    }

    let body = ''
    if (id === authorID) {
      body = `管理员将您的帖子<<${title}>>设置为精华帖`
    } else {
      body = `管理员将<<${title}>>设置成精华帖`
    }

    return { avatar, body }
  }

  onAnswer(data: TopicData) {
    const { user: { id } } = this
    const { topic: { answerID, title, avatar }, commentAuthorID, } = data
    if (!answerID || commentAuthorID !== id) {
      return { cancel: true }
    }

    let body = `您在<<${title}>>的回答被作者采纳`

    return { avatar, body }
  }
}
