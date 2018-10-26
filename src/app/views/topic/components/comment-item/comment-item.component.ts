import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'
import { map } from 'rxjs/operators'

import { TopicService } from 'src/app/services/topic.service'

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
  isReply = false
  loading = false

  @ViewChild('reply')
  $reply: ElementRef

  @Input() comment: Comment

  constructor(
    private topicService: TopicService
  ) { }

  ngOnInit() {
  }

  showReplyEditor() {
    this.isReply = true
  }

  cancel() {
    this.isReply = false
    this.$reply.nativeElement.innerText = ''
  }

  submit() {
    const { comment: { topicID, id, authorID }, $reply, topicService } = this
    const content = $reply.nativeElement.innerText.trim()
    if (content === '') {
      return
    }

    const params = {
      content,
      commentID: id,
      receiverID: authorID
    }

    this.loading = true
    topicService.postReply(topicID, params)
      .subscribe(done => {
        this.loading = false
        if (done) {
          this.cancel()
        }
      })
  }
}
