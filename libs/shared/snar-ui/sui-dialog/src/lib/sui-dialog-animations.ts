import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const ANIMATION_TIMINGS = '500ms ease-in-out';
export const suiDialogAnimations = {
  enterFromRight: trigger('slideInOut', [
    state('void', style({ transform: 'translateX(100%)' })),
    state('open', style({ transform: 'translateX(0)' })),
    state('closed', style({ transform: 'translateX(100%)' })),
    transition('* => *', animate(ANIMATION_TIMINGS)),
  ]),
};
