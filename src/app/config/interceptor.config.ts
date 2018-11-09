import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { map, catchError, retry, tap } from 'rxjs/operators'
import { NzMessageService } from 'ng-zorro-antd'

import { Router } from '@angular/router'
import { API_HOST } from 'src/app/config/global.config'
import * as utils from 'src/app/tools/util'

// 请求, 响应拦截器
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private message: NzMessageService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const secureReq = req.clone({
      url: `${API_HOST}${req.url}`,
      withCredentials: true,
    })

    return next.handle(secureReq)
      .pipe(
        tap((res: any) => {
          if (res instanceof HttpResponse) {
            const { body: { code, message } } = res

            if (code !== 0) {
              const err: any = new Error(message)
              err.code = code
              throw err
            }
          }
        }),
        catchError((error: HttpErrorResponse) => {
          const { ok, statusText } = error
          let msg = ''

          // 后端正常返回, code不是0
          if (ok === undefined) {
            msg = error.message

            if ((error as any).code === 409) {
              utils.clearStorage('user')
              this.router.navigate(['/login'])
            }
          }

          // 网络问题或后端没能正常返回
          if (ok === false) {
            msg = statusText
          }
          // 提示错误信息
          this.message.error(msg)

          return throwError(msg)
        })
      )
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
]
