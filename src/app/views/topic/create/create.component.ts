import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { slideLeft } from '../../../animations/slide-left'
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  animations: [slideLeft]
})
export class CreateComponent implements OnInit, OnDestroy {
  showAddTag = false
  searching = ''        // 'in' <=> '' 弹出tag搜索结果列表
  searchTag = ''
  tags = ['javascript', 'web', '算法']
  loading = false

  private search$ = new Subject<string>()
  private subscription: Subscription

  @ViewChild('tag') tag: ElementRef

  constructor() { }

  ngOnInit() {
    this.subscription = this.search$.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(tag => {
      // TODO: tag是否存在, 不存在则为新增
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  
  /**
   * 显示新增tag输入框
   */
  showAddTagInput() {
    this.loading = !this.loading
    this.showAddTag = true
    setTimeout(() => {
      this.tag.nativeElement.focus()
    }, 10)
  }

  postTag(e: KeyboardEvent) {
    const { keyCode } = e
    if (keyCode === 13) {
      // TODO: 新增标签
      if (!this.searching) {
        this.searching = 'in'
      }
    }

    if (keyCode === 27) {
      this.closeSearchingTags()
    }
  }

  closeSearchingTags() {
    // TODO: 关闭搜索tag列表
    this.showAddTag = false
    this.searching = ''
    this.searchTag = ''
  }

  search(tag: string) {
    if (!this.searching) {
      this.searching = 'in'
    }
    this.search$.next(tag)
  }
}
