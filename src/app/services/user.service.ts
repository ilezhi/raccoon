import { Injectable } from '@angular/core'

import { HttpService } from './http.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpService) {}

  login(): Observable<any> {
    const url = 'signin'
    return this.http.get(url)
  }
}