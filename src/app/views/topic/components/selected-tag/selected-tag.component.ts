import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { Store, select } from '@ngrx/store'

import { getTags } from 'src/app/reducers/entities.reducer'
import * as TagAction from 'src/app/action/tag.action'

@Component({
  selector: 'app-selected-tag',
  templateUrl: './selected-tag.component.html',
  styleUrls: ['./selected-tag.component.scss'],
})
export class SelectedTagComponent implements OnDestroy {
  tags = []         // 已选tag
  editable = false  // 搜索状态
  tag = ''          // 搜索输入
  list: Tag[]
  private sub: Subscription

  @ViewChild('input') $tag: ElementRef

  constructor(
    private store: Store<Entities<Tag>>
  ) {
    this.sub = store.pipe(select(getTags))
      .subscribe((tags: Entities<Tag>) => {
        this.list = Object.keys(tags).map(id => tags[id])
      })
  }

  ngOnDestroy() {
    // 取消订阅
    this.sub.unsubscribe()
  }

  onShowInput() {
    this.editable = true
    setTimeout(() => {
      this.$tag.nativeElement.focus()
    }, 10)
  }

  /**
   * 选择标签
   */
  onSelect(tag: Tag) {
    const item = this.isTagExist(tag.id, this.tags)

    !item && this.tags.push(tag)
  }

  /**
   * 添加tag, 回车添加, esc取消
   */
  post(e: KeyboardEvent): void {
    const { keyCode } = e

    if (keyCode === 13) {
      // 是否已添加
      let tag = this.isTagExist(this.tag, this.tags)
      if (tag) {
        return
      }

      // 本地是否存在
      tag = this.isTagExist(this.tag, this.list)
      if (tag) {
        this.tags.push(tag)
        return
      }

      // 新增
      this.store.dispatch(new TagAction.Post(this.tag))
      this.close()
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
   * 本地是否存在tag
   * @param key 
   */
  isTagExist(key: number | string, source: Tag[]) {
    if (!source.length) {
      return
    }

    const type = typeof key

    if (type !== 'number' && type !== 'string') {
      return
    }

    return source.find(tag => {
      if (type === 'number') {
        return tag.id === key
      }

      if (type === 'string') {
        return tag.name.trim().toLowerCase() === (key as string).toLowerCase()
      }

      return false
    })
  }

  /**
   * 删除tag
   * @param i index
   */
  del(i: number) {
    this.tags.splice(i, 1)
  }
}
