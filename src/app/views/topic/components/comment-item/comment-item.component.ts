import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'

import { TopicService } from 'src/app/services/topic.service'

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
  isReply = false
  loading = false
  liking = false

  @ViewChild('reply')
  $reply: ElementRef

  @Input() comment: Comment
  @Input() topic: Topic
  @Input() user: User

  constructor(
    private ts: TopicService
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
    const { comment: { topicID, id, authorID, commentID }, $reply, ts, } = this
    const content = $reply.nativeElement.innerText.trim()
    if (content === '') {
      return
    }

    const params = {
      content,
      commentID: commentID || id,
      receiverID: authorID,
      title: ts.topic.title,
      shared: ts.topic.shared,
      rid: ts.topic.authorID
    }

    this.loading = true
    ts.postReply(topicID, params)
      .subscribe(done => {
        this.loading = false
        if (done) {
          this.cancel()
        }
      })
  }

  onLike() {
    const { comment: { id, receiverID }, topic: { title, shared, authorID }, ts } = this
    const params = {
      title,
      shared,
      type: receiverID ? 'reply' : 'comment',
      authorID
    }

    this.liking = true
    ts.like(id, params)
      .subscribe(_ => {
        this.liking = false
      })
  }
}
