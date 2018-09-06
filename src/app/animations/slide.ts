import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations'

export const slide = trigger('slide', [
  transition('void => in', [
    style({transform: 'translateY(-100%)'}),
    animate(2000)
  ]),
  transition('in => void', [
    animate(1000, style({transform: 'translateY(-100%)'}))
  ])
])
