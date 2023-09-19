import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DialogRef,
  Dialog,
  DialogModule,
  CdkDialogContainer,
} from '@angular/cdk/dialog';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
@Component({
  standalone: true,
  imports: [RouterModule, DialogModule, OverlayModule],
  selector: 'snar-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'playground';
  dialog = inject(Dialog);
  overlay = inject(Overlay);

  ngOnInit(): void {
    const dialogRef = this.openSlideOver();

    dialogRef.closed.subscribe((result) => {
      console.log('Dialog closed', result);
    });
  }

  openSlideOver() {
    return this.dialog.open(DialogContentComponent, {
      panelClass: [
        'h-full',
        'pointer-events-auto',
        'max-w-md',
        'w-screen',
        'bg-white',
      ],
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .right('0')
        .top('0')
        .bottom('0'),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      container: SnarUiDialogContainerComponent,
    });
  }
}

@Directive({
  selector: `snar-ui-dialog-actions, [snar-ui-dialog-actions], [snarUiDialogActions]`,
  standalone: true,
})
export class SnarUiDialogActionsDirective {
  @HostBinding() class = 'flex flex-shrink-0 justify-end px-4 py-4';
}

@Directive({
  selector: `snar-ui-dialog-close, [snar-ui-dialog-close], [snarUiDialogClose]`,
  exportAs: 'snarUiDialogClose',
  standalone: true,
})
export class SnarUiDialogCloseDirective {
  @HostListener('click')
  _onClick() {
    this.dialogRef.close(this.dialogResult);
  }
  @Input('snar-ui-dialog-close') dialogResult: any;

  dialogRef = inject(DialogRef);
}
@Component({
  selector: 'snar-ui-dialog-container',
  standalone: true,
  imports: [PortalModule],
  template: ` <ng-template cdkPortalOutlet></ng-template> `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class SnarUiDialogContainerComponent
  extends CdkDialogContainer
  implements AfterViewInit
{
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit: ', this._config);
  }
}
@Component({
  selector: 'snar-ui-dialog-content',
  standalone: true,
  imports: [
    SnarUiDialogActionsDirective,
    SnarUiDialogCloseDirective,
    ReactiveFormsModule,
  ],
  template: `
    <h1 snar-ui-dialog-title>Hi</h1>
    <div snar-ui-dialog-body>
      <form [formGroup]="signupForm">
        <div class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email address</label
            >
            <div class="mt-1">
              <input
                type="email"
                id="email"
                name="email"
                autocomplete="email"
                formControlName="email"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <div class="mt-1">
              <input
                type="password"
                id="password"
                name="password"
                autocomplete="current-password"
                formControlName="password"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
    <div snar-ui-dialog-actions>
      <button
        type="button"
        class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        [snar-ui-dialog-close]="signupForm.value"
      >
        Ok
      </button>
      <button
        type="button"
        class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Cancel
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentComponent {
  fb = inject(FormBuilder);

  signupForm = this.fb.group({
    email: [''],
    password: [''],
  });
}
