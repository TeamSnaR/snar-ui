import { CdkDialogContainer, DialogModule } from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
} from '@angular/core';
import { suiDialogAnimations } from './sui-dialog-animations';
import { AnimationEvent } from '@angular/animations';

@Component({
  standalone: true,
  imports: [PortalModule, DialogModule, OverlayModule],
  template: ` <ng-template cdkPortalOutlet></ng-template> `,
  styles: [
    `
      :host {
        @apply w-full;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [suiDialogAnimations.enterFromRight],
})
export class SuiDialogContainerComponent extends CdkDialogContainer {
  @HostBinding('@slideInOut')
  animationState: 'void' | 'open' | 'closed' = 'open';

  @HostListener('@slideInOut.start', ['$event'])
  onAnimationStart($event: AnimationEvent) {
    this.animationStateChanged.emit($event);
  }
  @HostListener('@slideInOut.done', ['$event'])
  onAnimationDone($event: AnimationEvent) {
    this.animationStateChanged.emit($event);
  }

  #cdr = inject(ChangeDetectorRef);
  animationStateChanged = new EventEmitter<AnimationEvent>();

  startExitAnimation() {
    this.animationState = 'closed';
    this.#cdr.detectChanges();
  }
}
