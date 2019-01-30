import { Directive, ElementRef, EventEmitter, AfterViewInit, OnDestroy,  Output } from '@angular/core'

@Directive({
  selector: '[appSentry]'
})
export class SentryDirective implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver
  private exist = true

  @Output() load = new EventEmitter<void>()

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    try {
      this.observer = new IntersectionObserver(this.sentry.bind(this))
      this.observer.observe(this.el.nativeElement)
    } catch (err) {
      console.error('您的浏览器还不支持 IntersectionObserver')
      this.exist = false
    }
  }

  sentry(obj: IntersectionObserverEntry[]) {
    if (obj[0].isIntersecting) {
      this.load.emit()
    }
  }

  ngOnDestroy() {
    if (this.exist) {
      this.observer.disconnect()
    }
  }
}
