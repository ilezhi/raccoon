import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
  reciver = true
  isReply = false

  @Input() comment: any

  constructor() { }

  ngOnInit() {
  }

  showReplyEditor() {
    this.isReply = true
  }

  cancel() {
    this.isReply = false
  }

  submit() {

  }
}
