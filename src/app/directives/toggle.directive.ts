import { Directive, ElementRef, Input, OnInit, HostListener, OnChanges } from '@angular/core';

@Directive({
  selector: '[toggle]'
})
export class ToggleDirective implements OnInit, OnChanges {
  private $dropdown: HTMLElement

  @Input() toggle: number

  constructor(private $el: ElementRef) {}

  ngOnInit() {
    this.$dropdown = this.$el.nativeElement.nextElementSibling
    this.$dropdown.style.height = '0'
  }

  ngOnChanges() {
    const { $dropdown } = this
    if ($dropdown && $dropdown.offsetHeight) {
      setTimeout(() => {
        $dropdown.style.height = $dropdown.children.length * 32 + 'px'
      }, 0)
    }
  }

  @HostListener('click') onclick() {
    let { $dropdown, $el } = this
    const $arrow = $el.nativeElement.querySelector('.arrow')
    if (!$arrow) {
      return
    }
    const $dp = $el.nativeElement.nextElementSibling
    let h = $dp.offsetHeight

    if (h) {
      h = 0
      $arrow.classList.remove('down')
    } else {
      h = $dropdown.children.length * 32
      $arrow.classList.add('down')
    }

    $dp.style.height = `${h}px`
  }
}
