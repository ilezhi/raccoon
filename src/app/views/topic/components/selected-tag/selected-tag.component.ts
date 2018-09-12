import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Tag } from 'src/app/models'
import { slideLeft } from 'src/app/animations/slide-left'
import { TagService } from 'src/app/services/tag.service'

@Component({
  selector: 'app-selected-tag',
  templateUrl: './selected-tag.component.html',
  styleUrls: ['./selected-tag.component.scss'],
  animations: [slideLeft]
})
export class SelectedTagComponent implements OnInit {
  tags = []
  editable = false
  tag = ''
  searching = ''

  @ViewChild('input') $tag: ElementRef

  constructor(
    private tagService: TagService
  ) { }

  ngOnInit() {}

  showTagInput() {
    this.editable = true
    this.searching = 'in'
    setTimeout(() => {
      this.$tag.nativeElement.focus()
    }, 10)
  }

  /**
   * 根据当前输入的tag来检索
   * @param input tag输入
   */
  search(input: string) {
    this.tagService.input(input)
  }

  /**
   * 添加tag
   * TODO: 判断是否已存在, 存在则直接添加, 不存在则保存后添加
   */
  postTag(e: KeyboardEvent) {
    const { keyCode } = e

    if (keyCode === 13) {
      // 回车
      this.editable = false
      this.tag = ''
    }

    if (keyCode === 27) {
      this.close()
    }
  }

  close() {
    this.editable = false
    this.searching = ''
    this.tag = ''
  }

  onPickTag(tag: Tag) {
    const { selected } = tag
    if (selected) {
      this.tags.push(tag)
    } else {
      this.tags = this.tags.filter(t => t.id !== tag.id)
    }
  }

  delTag(id: number) {
    this.tagService.delTag(id)
    this.tags = this.tags.filter(t => t.id !== id)
  }
}
