import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { tap } from 'rxjs/operators'

import { fade } from 'src/app/animations/fade'
import { slideComt } from 'src/app/animations/slide'
import { TopicService } from 'src/app/services/topic.service'
import * as utils from 'src/app/tools/util'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [slideComt, fade]
})
export class DetailComponent implements OnInit, OnDestroy {
  topic: Topic
  hide: string
  done: boolean
  isParse = true
  fade: string
  visible = false
  tid: number
  comments = []

  favoring = false
  liking = false
  detailLoading = false
  commentsLoading = false

  sub: Subscription

  constructor(
    private route: ActivatedRoute,
    private ts: TopicService
  ) {}

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  ngOnInit() {
    const { route, ts } = this
    const tid = +route.snapshot.paramMap.get('id')
  
    this.tid = tid

    this.sub = ts.topic$(tid).pipe(
      tap(topic => {
        if (!topic) {
          this.fetchDetail(tid)
        }
      })
    ).subscribe(topic => {
      this.topic = topic
      this.ts.topic = topic
    })

    const childSub = ts.comments$(tid).pipe(
      tap(comts => {
        if (!comts) {
          this.fetchComments(tid)
        }
      })
    ).subscribe(comts => {
      this.comments = comts
    })

    this.sub.add(childSub)
  }

  fetchDetail(id) {
    this.detailLoading = true
    this.ts.detail(id)
      .subscribe(_ => {
        this.detailLoading = false
      })
  }

  fetchComments(id) {
    this.commentsLoading = true
    this.ts.comments(id)
      .subscribe(_ => {
        this.commentsLoading = false
      })
  }

  toggle() {
    this.done = false
    this.hide = this.hide === 'hide' ? '' : 'hide'
  }

  toggleDone() {
    this.done = !!this.hide
  }

  /**
   * 关闭topic page
   */
  close() {
    this.ts.close()
  }

  toggleComtEditor() {
    this.fade = this.fade === 'fade' ? '' : 'fade'
  }

  /**
   * 提交评论
   */
  onSubmit(text: string) {
    const { ts, tid, topic } = this
    const params = {
      content: text,
      rid: topic.authorID,
      title: topic.title,
      shared: topic.shared
    }

    ts.postComment(tid, params)
      .subscribe(done => {
        done && this.toggleComtEditor()
      })
  }

  showFavorModal() {
    const { topic, ts } = this
    if (topic.isFavor) {
      this.favoring = true
      ts.favor(topic.id, topic.categoryID)
        .subscribe(_ => {
          this.favoring = false
        })
    } else {
      this.visible = true
    }
  }

  onClose() {
    this.visible = false
  }

  /**
   * 点赞
   */
  onLike() {
    const { topic, ts } = this
    this.liking = true
    ts.like(topic.id, 'topic')
      .subscribe(_ => {
        this.liking = false
      })
  }
}
