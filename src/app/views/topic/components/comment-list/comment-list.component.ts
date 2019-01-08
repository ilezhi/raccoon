import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input() data: Array<Comment> = []
  @Input() topic: Topic
  @Input() user: User

  constructor() { }

  ngOnInit() {
  }

  trackByFn(_, item) {
    const { receiverID, id } = item
    const type = receiverID ? 'comt' : 'reply'
    return id + type
  }
}
