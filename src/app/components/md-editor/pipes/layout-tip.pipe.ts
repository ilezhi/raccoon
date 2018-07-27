import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'layoutTip'})
export class LayoutTip implements PipeTransform {
  transform(value: number) {
    return value ? '双栏' : '单栏';
  }
}
