import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpService) {}

  login(userInfo: LoginForm): Observable<any> {
    return this.http.post('signin', userInfo)
      .pipe(
        map((res: Res) => res.data)
      )
  }

  fetchInfo(): Observable<any> {
    return this.http.get('user/info')
      .pipe(
        map((res: Res) => res.data)
      )
  }
}
