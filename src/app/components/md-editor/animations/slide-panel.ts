import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export const slidePanel = [
  trigger('statePreview', [
    state('edit', style({
      width: '0%'
    })),
    state('preview', style({
      width: '50%'
    })),
    state('full', style({
      width: '100%'
    })),
    transition('* <=> *', animate('300ms ease-in'))
  ]),
  trigger('stateEdit', [
    state('edit', style({
      width: '100%'
    })),
    state('preview', style({
      width: '50%'
    })),
    state('full', style({
      width: '0%'
    })),
    transition('* <=> *', animate('300ms ease-in'))
  ])
]
