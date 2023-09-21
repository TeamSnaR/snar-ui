import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Directive,
  Host,
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
    return this.dialog.open(SignupFormSlideOverComponent, {
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
  selector: `snar-ui-dialog-header, [snar-ui-dialog-header], [snarUiDialogHeader]`,
  standalone: true,
})
export class SnarUiDialogHeaderDirective {
  @HostBinding() class = 'flex items-center justify-between px-4 sm:px-6 py-6';
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
  standalone: true,
  imports: [PortalModule],
  template: ` <ng-template cdkPortalOutlet></ng-template> `,
  styles: [
    `
      :host {
        @apply block h-full w-full;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnarUiDialogContainerComponent extends CdkDialogContainer {}
@Component({
  standalone: true,
  imports: [
    SnarUiDialogActionsDirective,
    SnarUiDialogCloseDirective,
    SnarUiDialogHeaderDirective,
    ReactiveFormsModule,
  ],
  template: `
    <div
      class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
    >
      <div snar-ui-dialog-header>
        <h2
          class="text-base font-semibold leading-6 text-gray-900"
          id="slide-over-title"
        >
          Sign-up now
        </h2>
        <div class="ml-3 flex h-7 items-center">
          <button
            type="button"
            class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            snarUiDialogClose
          >
            <span class="absolute -inset-2.5"></span>
            <span class="sr-only">Close panel</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="relative pt-6 flex-1 px-4 sm:px-6">
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
          class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
          snarUiDialogClose
        >
          Cancel
        </button>
        <button
          type="submit"
          class="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          [snar-ui-dialog-close]="signupForm.value"
        >
          Save
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormSlideOverComponent {
  fb = inject(FormBuilder);

  signupForm = this.fb.group({
    email: [''],
    password: [''],
  });
}
