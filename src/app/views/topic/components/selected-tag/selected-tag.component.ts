import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';

import { TagService } from 'src/app/services/tag.service'
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-selected-tag',
  templateUrl: './selected-tag.component.html',
  styleUrls: ['./selected-tag.component.scss'],
})
export class SelectedTagComponent implements OnDestroy {
  tags = []         // 已选tag
  editable = false  // 搜索状态
  tag = ''          // 搜索输入
  loading = false   // 搜索loading
  result: Tag[]

  private sub: Subscription

  @ViewChild('input') $tag: ElementRef

  constructor(
    private tagService: TagService
  ) {
    this.sub = tagService.search()
      .subscribe(data => {
        this.loading = false
        this.result = data
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  onShowInput() {
    this.editable = true
    setTimeout(() => {
      this.$tag.nativeElement.focus()
    }, 10)
  }

  onSearchInput(input: string) {
    this.loading = true
    this.tagService.input(input)
  }

  onSelect(tag: Tag) {
    const isExist = this.tags.some(t => {
      return t.id === tag.id
    })

    !isExist && this.tags.push(tag)
  }

  /**
   * 添加tag
   * TODO: 判断是否已存在, 存在则直接添加, 不存在则保存后添加
   */
  post(e: KeyboardEvent): void {
    const { keyCode } = e

    if (keyCode === 13) {
      // 回车
      let { result, tag, tags, tagService } = this
      tag = tag.trim()

      if (!tag) {
        return
      }

      const item = result.find(item => {
        return item.name.toLowerCase() === tag.toLowerCase()
      })

      if (item) {
        tags.push(item)
        this.close()
      } else {
        // 相当于新增
        tagService.post(tag)
          .subscribe(tag => {
            tag && tags.push(tag)
            this.close()
          })
      }
    }

    if (keyCode === 27) {
      this.close()
    }
  }

  close() {
    this.editable = false
    this.tag = ''
  }

  /**
   * 删除tag
   * @param i index
   */
  del(i: number) {
    this.tags.splice(i, 1)
  }
}
