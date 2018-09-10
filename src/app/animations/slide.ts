import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations'

export const slide = trigger('slide', [
  transition('void => in', [
    animate(800, keyframes([
      style({'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)', transform: 'translate3d(0, -100%, 0)', offset: 0}),
      style({'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)', transform: 'translate3d(0, -100%, 0)', offset: 0.2}),
      style({'animation-timing-function': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)', transform: 'translate3d(0, -10%, 0)', offset: 0.4}),
      style({'animation-timing-function': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)', transform: 'translate3d(0, -10%, 0)', offset: 0.43}),
      style({'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)', transform: 'translate3d(0, 0, 0)', offset: 0.53}),
      style({'animation-timing-function': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)', transform: 'translate3d(0, -5%, 0)', offset: 0.7}),
      style({'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)', transform: 'translate3d(0, 0, 0)', offset: 0.8}),
      style({transform: 'translate3d(0, -1%, 0)', offset: 0.9}),
      style({'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)', transform: 'translate3d(0, 0, 0)', offset: 1}),
    ]))
  ]),
  transition('in => void', [
    animate('0.5s ease-in', keyframes([
      style({transform: 'translate3d(0, -10%, 0)', offset: 0.2}),
      style({transform: 'translate3d(0, 10%, 0)', offset: 0.4}),
      style({transform: 'translate3d(0, 10%, 0)', offset: 0.45}),
      style({transform: 'translate3d(0, -100%, 0)', offset: 1}),
    ]))
  ])
])
