import { DialogRef } from '@angular/cdk/dialog';
import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  inject,
} from '@angular/core';
import { SuiDialogRefService } from './sui-dialog-ref.service';

@Directive({
  selector: `sui-dialog-header, [sui-dialog-header], [suiDialogHeader]`,
  standalone: true,
})
export class SuiDialogHeaderDirective {
  @HostBinding() class = 'flex items-center justify-between px-4 sm:px-6 py-6';
}

@Directive({
  selector: `sui-dialog-actions, [sui-dialog-actions], [suiDialogActions]`,
  standalone: true,
})
export class SuiDialogActionsDirective {
  @HostBinding() class = 'flex flex-shrink-0 justify-end px-4 py-4';
}

@Directive({
  selector: `sui-dialog-close, [sui-dialog-close], [suiDialogClose]`,
  exportAs: 'suiDialogClose',
  standalone: true,
})
export class SuiDialogCloseDirective {
  @HostListener('click')
  _onClick() {
    this.suiDialogRef.close(this.dialogResult);
  }
  @Input('sui-dialog-close') dialogResult: any;

  suiDialogRef = inject(SuiDialogRefService);
}
