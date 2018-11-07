import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

moment.locale('zh-CN')

@Pipe({name: 'ago'})
export class Ago implements PipeTransform {
  transform(val: any) {
    const type = typeof val
    if (type === 'number') {
      // unix时间戳
      return moment.unix(val).fromNow()
    }

    return moment(val).fromNow()
  }
}
