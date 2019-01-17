import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { NzMessageService } from 'ng-zorro-antd'

import { UserService } from 'src/app/services/user.service'
import { TopicService } from 'src/app/services/topic.service'

@Component({
  selector: 'app-favor-modal',
  templateUrl: './favor-modal.component.html',
  styleUrls: ['./favor-modal.component.scss']
})
export class FavorModalComponent implements OnInit, OnDestroy {
  category = ''
  editable = false
  show = false
  posting: boolean
  favor: number
  cid: number // 当前选中收藏类型

  @Input() topic: Topic

  categories: Array<Category>
  sub: Subscription

  @Input()
  set visible(val) {
    this.show = val
    if (!val) {
      this.onHideInput()
    }
  }
  @Output() cancel = new EventEmitter<void>()

  constructor(
    private message: NzMessageService,
    private userService: UserService,
    private topicService: TopicService
  ) {
    this.sub = this.userService.categories$.subscribe(data => {
      this.categories = data
    })
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  /**
   * 显示新建分类
   */
  onShowInput() {
    this.editable = true
  }

  onHideInput() {
    this.editable = false
    this.category = ''
  }

  /**
   * 新增分类
   */
  onNewCategory() {
    let { category, categories } = this
    category = category.trim()
    if (!category) {
      this.message.info('分类名不能为空')
      return
    }

    const isExist = categories.some(c => {
      return c.name.toLowerCase() === category.toLowerCase()
    })

    if (isExist) {
      this.message.info(`"${category}"已存在`)
      return
    }

    this.posting = true
    this.userService.postCategory(category)
      .subscribe(done => {
        this.posting = false
        if (done) {
          this.onHideInput()
        }
      })
  }

  /**
   * 关闭modal
   */
  onCancel() {
    this.favor = -1

    this.cancel.emit()
  }

  /**
   * 收藏
   * @param id 分类id
   */
  onFavor(cid: number) {
    this.cid = cid
    const { topic: { id, title, shared, authorID } } = this
    const params = {
      categoryID: cid,
      title,
      shared,
      authorID,
      type: 'topic'
    }

    this.topicService.favor(id, params)
      .subscribe(favor => {
        if (favor) {
          this.favor = id
        } else {
          this.favor = -1
        }
        this.cid = -1
      })
  }

  trackByFn(i, item): number {
    return item.id
  }
}
