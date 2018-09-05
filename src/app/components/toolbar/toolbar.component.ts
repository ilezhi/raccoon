import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() filter = new EventEmitter<number>()
  constructor() { }

  ngOnInit() {
  }

  onRefresh() {
    console.log('refresh')
  }

  onDateFilter(ev) {
    this.filter.emit(ev.target.dataset.date)
  }
}
