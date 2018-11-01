import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-topic-tag',
  templateUrl: './tag.component.html',
})
export class TagComponent {
  status: string

  @Input()
  set topic(topic: Topic) {
    let status: string

    if (!topic) {
      status = 'q&a' 
    } else if (topic.top) {
      status = 'top'
    } else if (topic.awesome) {
      status = 'awesome'
    } else if (topic.shared) {
      status = 'shared'
    } else {
      status = 'q&a'
    }
    this.status = status
  }
}
