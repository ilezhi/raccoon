import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EditorService {
  private toolbar = new Subject<ToolbarItem>();
  private data = new Subject<any>();
  private fullscreen = new Subject<boolean>();

  toolbar$ = this.toolbar.asObservable();
  data$ = this.data.asObservable();
  fullscreen$ = this.fullscreen.asObservable();

  constructor() {}

  // 广播点击toolbar插入文本
  toolbarItemClick(item: ToolbarItem) {
    this.toolbar.next(item);
  }

  updateText(value: string) {
    this.data.next({value});
  }

  toggleFullscreen(value: boolean) {
    this.fullscreen.next(value);
  }

  // 生成插入后的内容, 并广播.
  insertText(selection: SelectedText, item: ToolbarItem, value: string) {
    const { prefix, subfix, text } = item;
    let { start, end } = selection;

    if (typeof start !== 'number' || typeof end !== 'number') {
      throw new Error('浏览器版本过低');
    }

    let lenPrefix = prefix.length;
    let lenSubfix = subfix.length;
    let lenText = text.length;

    if (start === end) {
      // 直接插入
      value = value.substring(0, start) + prefix + text + subfix + value.substring(end);
      start = start + lenPrefix;
      end = start + lenText;
    } else {
      // 存在选中区域, 则取消
      if (value.substring(start - lenPrefix, start) === prefix && value.substring(end, end + lenSubfix) === subfix) {
        value = value.substring(0, start - lenPrefix) + text + value.substring(end + lenSubfix);
        start = start - lenPrefix;
        end =  end - lenPrefix;
      } else {
        // 替换选中的内容
        value = value.substring(0, start) + prefix + text + subfix + value.substring(end);
        start = start + lenPrefix;
        end = start + lenText;
      }
    }

    this.data.next({value, start, end});
  }
}
