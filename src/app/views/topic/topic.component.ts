import { Component, OnInit } from '@angular/core';
import { Router }                 from '@angular/router';

import { slide } from '../../animations/slide'

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
  animations: [slide]
})
export class TopicComponent implements OnInit {
  state = 'in'
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClose() {
    this.state = ''
  }

  slideDone() {
    if (!this.state) {
      this.router.navigate([{outlets: {slide: null}}])
    }
  }
}
