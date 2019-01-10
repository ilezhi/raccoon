import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { tap } from 'rxjs/operators'
import { NzMessageService } from 'ng-zorro-antd'

import { SelectedTagComponent } from '../components/selected-tag/selected-tag.component'
import { TopicService } from '../../../services/topic.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  title = ''
  content = ''
  shared = false
  loading = false
  tid: number
  tags: any

  sub: Subscription

  @ViewChild(SelectedTagComponent) $tag: SelectedTagComponent

  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute,
    private ts: TopicService
  ) { }

  ngOnInit() {
    const { route, ts} = this
    const tid = +route.snapshot.paramMap.get('id')
  
    this.tid = tid

    this.sub = ts.topic$(tid).pipe(
      tap(topic => {
        if (!topic) {
          this.fetchDetail(tid)
        }
      })
    ).subscribe(topic => {
      if (topic) {
        this.title = topic.title
        this.content = topic.content
        this.tags = topic.tags
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  fetchDetail(id: number) {
    this.loading = true
    this.ts.detail(id)
      .subscribe(_ => {
        this.loading = false
      })
  }

  onSave(text: string) {
    let { title, shared, $tag, ts, tid } = this
    title = title.trim()

    if (title === '') {
      return this.notify(1)
    }

    const len = title.length
    if (len < 10 || len > 30) {
      return this.notify(2)
    }

    const tags = $tag.tags.map(t => t.id)
    if (tags.length === 0) {
      return this.notify(3)
    }

    const params = {
      title,
      shared,
      tags,
      content: text,
    }

    this.loading = true
    ts.put(tid, this.tags, params)
      .subscribe(done => {
        this.loading = false
        if (done) {
          this.message.success('发布成功')
          this.onClose()
        }
      })
  }

  onClose() {
    this.ts.close()
  }

  notify(code) {
    let msg = ''
    switch(code) {
      case 1:
        msg = '标题不能为空'
        break
      case 2:
        msg = '标题长度需限制在10~30个字符'
        break
      case 3:
        msg = '至少添加一个标签'
        break
    }

    this.message.warning(msg)
  }
}
