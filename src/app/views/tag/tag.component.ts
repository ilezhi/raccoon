import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store'

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

}
