import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { NzMessageService } from 'ng-zorro-antd'

import { UserService } from 'src/app/services/user.service'
import { TopicService } from 'src/app/services/topic.service'

@Component({
  selector: 'app-favor-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './favor-modal.component.html',
  styleUrls: ['./favor-modal.component.scss']
})
export class FavorModalComponent implements OnInit, OnDestroy {
  category = ''
  editable = false
  show = false
  topicID: number
  posting: boolean

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
    private route: ActivatedRoute,
    private message: NzMessageService,
    private userService: UserService,
    private topicService: TopicService
  ) {
    this.sub = this.userService.categories$.subscribe(data => {
      this.categories = data
    })
  }

  ngOnInit() {
    this.topicID = +this.route.snapshot.paramMap.get('id')
  }

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
    this.cancel.emit()
  }

  /**
   * 收藏
   * @param id 分类id
   */
  onFavor(id: number) {
    
  }
}
