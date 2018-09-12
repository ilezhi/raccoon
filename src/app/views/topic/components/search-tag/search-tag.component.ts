import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

import { Tag } from 'src/app/models'
import { TagService } from 'src/app/services/tag.service'
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-search-tag',
  templateUrl: './search-tag.component.html',
  styleUrls: ['./search-tag.component.scss']
})
export class SearchTagComponent implements OnInit, OnDestroy {
  private subscription: Subscription

  tags = [
    {id: 1, name: 'javascript'},
    {id: 2, name: 'web'},
    {id: 3, name: '算法'}
  ]
  loading = false

  @Output() close = new EventEmitter<void>()
  @Output() select = new EventEmitter<Tag>()

  constructor(
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.sub()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  sub() {
    const { tagService, searchTag, delTag } = this
    const subs = tagService.listen()
      .subscribe(searchTag.bind(this))

    const sub = tagService.delTag$
      .subscribe(delTag.bind(this))

    this.subscription = subs.add(sub)
  }

  onClose() {
    this.close.emit()
  }

  /**
   * 监听输入的tag后触发检索
   * @param tag 要检索的tag
   * 1. 本地检索
   * 2. 远程检索 存在则保存到本地, 不存在则为新增后保存到本地
   */
  searchTag(tag: string) {
    this.loading = true
    this.tagService.fetchTag(tag)
      .subscribe((tags: Tag[]) => {
        this.loading = false
        this.tags = tags
      })
  }

  onPickTag(tag: Tag, i) {
    tag = {
      ...tag,
      selected: !tag.selected
    }

    this.tags.splice(i, 1, tag)
    this.select.emit(tag)
  }

  delTag(id: number) {
    this.tags = this.tags.map(t => {
      if (t.id === id) {
        return {
          ...t,
          selected: false
        }
      }

      return t
    })
  }
}
