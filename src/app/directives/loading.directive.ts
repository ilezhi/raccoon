import { Directive, Input, ElementRef, OnChanges, Renderer2 } from '@angular/core'

@Directive({
  selector: '[loading]'
})
export class LoadingDirective implements OnChanges {
  private $div: HTMLElement
  @Input() loading: string | boolean

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.onLoading()
  }

  ngOnChanges() {
    this.onLoading()
  }

  onLoading() {
    const { loading, el, renderer, $div } = this
    if (loading) {
      const div = renderer.createElement('div')
      renderer.setAttribute(div, 'class', 'loading')
      renderer.setAttribute(el.nativeElement, 'style', 'position:relative')
      renderer.appendChild(el.nativeElement, div)
      this.$div = div
    } else if ($div) {
      renderer.removeChild(el.nativeElement, $div)
      this.$div = null
    }
  }
}
