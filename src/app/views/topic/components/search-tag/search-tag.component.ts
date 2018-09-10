import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-tag',
  templateUrl: './search-tag.component.html',
  styleUrls: ['./search-tag.component.scss']
})
export class SearchTagComponent {

  @Output() close = new EventEmitter<void>()

  constructor() { }

  onClose() {
    this.close.emit()
  }
}
