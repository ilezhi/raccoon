import { Directive, ElementRef, EventEmitter, AfterViewInit, OnDestroy,  Output } from '@angular/core'

@Directive({
  selector: '[sentry]'
})
export class SentryDirective implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver

  @Output() load = new EventEmitter<void>()

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(this.sentry.bind(this))
    this.observer.observe(this.el.nativeElement)
  }

  sentry(obj: IntersectionObserverEntry[]) {
    if (obj[0].isIntersecting) {
      this.load.emit()
    }
  }

  ngOnDestroy() {
    this.observer.disconnect()
  }
}
