import { Component, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'

import { slide } from 'src/app/animations/slide'
import { TopicService } from 'src/app/services/topic.service'

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
  animations: [slide]
})
export class TopicComponent implements OnDestroy {
  state = 'in'
  private sub: Subscription

  constructor(
    private router: Router,
    topicService: TopicService
  ) {
    this.sub = topicService.editor$.subscribe(close => {
      if (close) {
        this.onClose()
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  onClose() {
    this.state = ''
  }

  slideDone() {
    if (!this.state) {
      this.router.navigate([{outlets: {slide: null}}])
    }
  }
}
