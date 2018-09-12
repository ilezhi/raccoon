import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, data?: object): Observable<T> {
    const params = this.setParams(data)
    return this.http.get<T>(url, { params })
  }

  post<T>(url: string, data?: object): Observable<T> {
    const headers = this.setHeaders()
    return this.http.post<T>(url, data, { headers })
  }

  put<T>(url: string, data?: object): Observable<T> {
    const headers = this.setHeaders()
    return this.http.put<T>(url, data, { headers })
  }

  delete<T>(url: string): Observable<T> {
    const headers = this.setHeaders()
    return this.http.delete<T>(url, { headers })
  }

  private setParams(data: object): HttpParams {
    if (!data) {
      return
    }
    let params = new HttpParams()
    for (const key of Object.keys(data)) {
      const val = data[key]
      if (val) {
        params = params.set(key, val)
      }
    }

    return params
  }

  private setHeaders(): HttpHeaders {
    const headers = new HttpHeaders()

    return headers.set('Content-Type', 'application/json')
  }
}
