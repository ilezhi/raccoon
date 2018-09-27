import { Component, OnInit, ViewChild } from '@angular/core'
import { Store } from '@ngrx/store'
import { NzMessageService } from 'ng-zorro-antd'

import { SelectedTagComponent } from '../components/selected-tag/selected-tag.component'
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  title = ''
  shared = false
  loading = false

  @ViewChild(SelectedTagComponent) $tag: SelectedTagComponent

  constructor(
    private message: NzMessageService,
    private topicService: TopicService
  ) {}

  ngOnInit() {}

  /**
   * 保存topic
   * @param text markdonw
   * 1. 获取title
   * 2. 获取tag
   * 3. 获取project
   */
  onSave(text: string) {
    let { title, shared, $tag, topicService } = this
    title = title.trim()

    if (title === '') {
      return this.message.warning('标题不能为空')
    }

    const len = title.length
    if (len < 10 || len > 30) {
      return this.message.warning('标题长度需限制在10~30个字符')
    }

    const tags = $tag.tags.map(t => t.id)
    if (tags.length === 0) {
      return this.message.warning('至少添加一个标签')
    }

    const params = {
      title,
      shared,
      tags,
      content: text,
    }

    this.loading = true
    topicService.post(params)
      .subscribe(done => {
        this.loading = false
        if (done) {
          this.message.success('发布成功')
          topicService.close()
        }
      })
  }

  onClose() {
    this.topicService.close()
  }
}
