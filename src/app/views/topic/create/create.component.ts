import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd'

import { SelectedTagComponent } from '../components/selected-tag/selected-tag.component'
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  title: string = ''
  projects = [
    {id: 1, name: 'raccon'}
  ]
  pid: number

  @ViewChild(SelectedTagComponent) $tag: SelectedTagComponent

  constructor(
    private router: Router,
    private message: NzMessageService,
    private topicService: TopicService
  ) { }

  ngOnInit() {}

  onClose() {
    this.router.navigate([{outlets: {slide: null}}])
  }

  /**
   * 保存topic
   * @param text markdonw
   * 1. 获取title
   * 2. 获取tag
   * 3. 获取project
   */
  onSave(text: string) {
    let { title, pid: projectID, $tag, topicService } = this
    title = title.trim()

    if (title === '') {
      return this.message.warning('标题不能为空')
    }

    const tags = $tag.tags.map(t => t.id)
    const params = {
      title,
      projectID,
      tags,
      content: text
    }
    
    topicService.postTopic(params)
      .subscribe(topic => {
        this.message.success('成功')
      })
  }
}
