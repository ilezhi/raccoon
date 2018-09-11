import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

import { TagService } from 'src/app/services/tag.service'

@Component({
  selector: 'app-search-tag',
  templateUrl: './search-tag.component.html',
  styleUrls: ['./search-tag.component.scss']
})
export class SearchTagComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  loading = true

  @Output() close = new EventEmitter<void>()

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
    const { tagService, searchTag } = this
    this.subscription = tagService.listen()
      .subscribe(searchTag)
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
  }
}
