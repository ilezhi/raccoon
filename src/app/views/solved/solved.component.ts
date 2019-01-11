import { Component, OnDestroy } from '@angular/core'
import { UserService } from 'src/app/services/user.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-solved',
  templateUrl: './solved.component.html',
  styleUrls: ['./solved.component.scss']
})
export class SolvedComponent implements OnDestroy {
  url: string
  sub: Subscription

  constructor(private us: UserService) {
    this.sub = us.url$.subscribe((url: string) => {
      this.url = url
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
