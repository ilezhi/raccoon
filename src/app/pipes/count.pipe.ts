import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'count'})
export class Count implements PipeTransform {
  transform(val: Array<any>, type) {
    let len = val.length

    if (type === 'string') {
      return len + ''
    }
    return len
  }
}
