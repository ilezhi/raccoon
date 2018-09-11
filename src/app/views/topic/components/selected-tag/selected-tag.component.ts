import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { slideLeft } from 'src/app/animations/slide-left'
import { TagService } from 'src/app/services/tag.service'

@Component({
  selector: 'app-selected-tag',
  templateUrl: './selected-tag.component.html',
  styleUrls: ['./selected-tag.component.scss'],
  animations: [slideLeft]
})
export class SelectedTagComponent implements OnInit {
  tags = ['javascript', 'web', '算法']
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
    setTimeout(() => {
      this.$tag.nativeElement.focus()
    }, 10)
  }

  /**
   * 根据当前输入的tag来检索
   * @param input tag输入
   */
  search(input: string) {
    !this.searching && (this.searching = 'in')
    this.tagService.input(input)
  }

  /**
   * 添加tag
   * TODO: 判断是否已存在, 存在则直接添加, 不存在则保存后添加
   */
  postTag() {

  }

  close() {
    this.editable = false
    this.searching = ''
    this.tag = ''
  }
}
