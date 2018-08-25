import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  showTags = 0;

  constructor() { }

  ngOnInit() {
  }

  onToggleTags() {
    this.showTags ^= 1;
  }
}
