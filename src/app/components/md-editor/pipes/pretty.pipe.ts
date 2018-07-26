import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'pretty'})
export class Pretty implements PipeTransform {
  transform(value = '') {
    if (value.includes('prettyprint')) {
      setTimeout(() => {
        prettyPrint();
      }, 0);
    }
    return value;
  }
}
