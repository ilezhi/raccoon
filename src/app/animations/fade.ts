import {
  trigger,
  style,
  state,
  transition,
  animate,
} from '@angular/animations'

export const fade = trigger('fade', [
  state('fade', style({
    opacity: 1,
    transform: 'scale(1)'
  })),
  transition('void => *', [
    style({opacity: 0, transform: 'scale(0.6)'}),
    animate('300ms ease-in')
  ]),
  transition('* => void', [
    animate('300ms ease-out', style({opacity: 0, transform: 'scale(1.2)'}))
  ])
])
