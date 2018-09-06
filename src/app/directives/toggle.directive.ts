import { Directive, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[toggle]'
})
export class ToggleDirective implements OnInit {
  private height: number

  constructor(private $el: ElementRef) {}

  ngOnInit() {
    const $dp: HTMLElement = this.$el.nativeElement.nextElementSibling
    this.height = $dp.offsetHeight
    $dp.style.height = '0'
  }

  @HostListener('click') onclick() {
    const { height, $el } = this
    const $dp = $el.nativeElement.nextElementSibling
    const $arrow = $el.nativeElement.querySelector('.arrow')
    let h = $dp.offsetHeight

    if (h) {
      h = 0
      $arrow.classList.remove('down')
    } else {
      h = height
      $arrow.classList.add('down')
    }

    $dp.style.height = `${h}px`
  }
}
