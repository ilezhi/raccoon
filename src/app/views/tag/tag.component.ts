import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { TagTopicsAction } from '../../action/tag.action'

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

  onFilterByDate(n) {
    const topic = {
      id: 1,
      time: 20180909,
      page: 1,
      size: 50,
      total: 100,
      filter: ''
    }

    this.store.dispatch(new TagTopicsAction(topic))
  }

}
