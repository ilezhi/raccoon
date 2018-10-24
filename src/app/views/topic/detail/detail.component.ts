import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { map, switchMap, concatMap, combineAll, take, tap } from 'rxjs/operators'
import { EMPTY as empty, of } from 'rxjs'
import { Store, select } from '@ngrx/store'

import { getFullTopic } from 'src/app/reducers/entities.reducer'
import { TopicService } from 'src/app/services/topic.service'
import * as TopicAction from 'src/app/action/topic.action'
import { slideComt } from 'src/app/animations/slide'
import { fade } from 'src/app/animations/fade'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [slideComt, fade]
})
export class DetailComponent implements OnInit {
  topic: Topic
  hide: string
  done: boolean
  isParse = true
  fade: string
  visible = false
  tid: number
  comments = []
  total: number // 评论数量

  constructor(
    private route: ActivatedRoute,
    private store: Store<Entities<Topic>>,
    private topicService: TopicService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = +params.get('id')
        this.tid = id
        return this.store.pipe(
          select(getFullTopic(id)),
          tap(topic => {
            if (topic){
              return
            }

            this.store.dispatch(new TopicAction.Detail(id))
            this.store.dispatch(new TopicAction.Comments(id))
          })
        )
      })
    ).subscribe((topic: Topic) => {
      this.topic = topic
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
    this.topicService.close()
  }

  toggleComtEditor() {
    this.fade = this.fade === 'fade' ? '' : 'fade'
  }

  /**
   * 提交评论
   */
  onSubmit(text: string) {
    const { topicService, tid } = this
    topicService.postComment(tid, text)
      .subscribe(done => {
        done && this.toggleComtEditor()
      })
  }

  showFavorModal() {
    this.visible = true
  }

  onClose() {
    this.visible = false
  }

  onFavorSubmit() {

  }
}
