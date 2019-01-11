import { Pipe, PipeTransform } from '@angular/core'

const active = {
  home: ['/all', '/awesome', '/department'],
  solved: ['/solved/question', '/solved/answer']
}

@Pipe({name: 'linkActive'})
export class LinkActive implements PipeTransform {
  transform(val: string, menu: string = 'home') {
    const urls = active[menu]
    if (!urls) {
      return false
    }
    
    return urls.includes(val)
  }
}
