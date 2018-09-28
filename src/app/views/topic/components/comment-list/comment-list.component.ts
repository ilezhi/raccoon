import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  comments = [
    {
      name: 'c1',
      reply: [
        {
          name: 'r1',
          reciver: '来来来来'
        },
        {
          name: 'r2'
        }
      ]
    },
    {
      name: 'c2',
      reply: [
        {
          name: 'r2'
        }
      ]
    },
    {
      name: 'c3'
    },
    {
      name: 'c4'
    },
    {
      name: 'c5'
    },
    {
      name: 'c6'
    },
    {
      name: 'c7'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
