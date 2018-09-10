import {
  trigger,
  style,
  state,
  transition,
  animate,
} from '@angular/animations'

export const slideLeft = trigger('slideLeft', [
  state('in', style({transform: 'translate3d(0, 0, 0)'})),
  transition('void => in', [
    style({transform: 'translate3d(-100%, 0, 0)'}),
    animate(300)
  ]),
  transition('in => void', [
    animate('0.3s ease-in', style({transform: 'translate3d(-100%, 0, 0)'}))
  ])
])
