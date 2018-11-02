import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Subscription, of, zip } from 'rxjs'
import { switchMap, tap } from 'rxjs/operators'

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
  total = 0 // 评论数量

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
    this.sub = route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = +params.get('id')
        this.tid = id
        return ts.topic$(id).pipe(
          tap(topic => {
            if (!topic) {
              this.fetchDetail(id)
              this.fetchComments(id)
            }
          }),
          switchMap(topic => zip(of(topic), ts.comments$(id)))
        )
      })
    ).subscribe(([topic, comts]: any) => {
      this.topic = topic
      this.comments = comts
      this.total = utils.getNodeCount(comts, 'replies')
    })
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
    const { ts, tid } = this
    ts.postComment(tid, text)
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
