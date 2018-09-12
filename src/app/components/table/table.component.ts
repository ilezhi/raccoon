import { Component, OnInit, Input } from '@angular/core';
import { Topic } from 'src/app/models'
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data: Topic[]

  constructor() { }

  ngOnInit() {
  }

}
