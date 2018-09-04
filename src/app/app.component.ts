import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs';
import { Topic } from './models/topic.model'
import { StateTree } from './reducers'
import { getUsers } from './reducers/entities.reducer'
import { AddTopicAction } from './action/entity.action'

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  topics$: Array<Topic>;

  constructor(private store: Store<StateTree>) {
    store.pipe(select(getUsers))
      .subscribe(data => {
        console.log(data)
      })
  }

  increment() {
    const topic = {1: {
      id: 1,
      title: 'haha',
      content: '这是一个测试文章',
      tags: [1, 2, 3],
      view: 0
    }}

    this.store.dispatch(new AddTopicAction(topic))
  }
}
