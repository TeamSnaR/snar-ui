import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@angular/cdk/dialog';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  SuiDialogActionsDirective,
  SuiDialogCloseDirective,
  SuiDialogHeaderDirective,
  SuiDialogService,
} from '@team-snar/snar-ui/sui-dialog';

@Component({
  standalone: true,
  imports: [RouterModule, DialogModule, OverlayModule],
  selector: 'snar-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'playground';
  suiDialog = inject(SuiDialogService);
  overlay = inject(Overlay);

  openSlideOver() {
    const suiDialogRef = this.suiDialog.open(SignupFormSlideOverComponent);
    suiDialogRef.beforeClosed().subscribe((result) => {
      console.log('beforeClosed', result);
    });
    suiDialogRef.afterClosed().subscribe((result) => {
      console.log('afterClosed', result);
    });
  }
}

@Component({
  standalone: true,
  imports: [
    SuiDialogActionsDirective,
    SuiDialogCloseDirective,
    SuiDialogHeaderDirective,
    ReactiveFormsModule,
  ],
  template: `
    <div
      class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
    >
      <div sui-dialog-header>
        <h2
          class="text-base font-semibold leading-6 text-gray-900"
          id="slide-over-title"
        >
          Sign-up now
        </h2>
        <div class="ml-3 flex h-7 items-center">
          <button
            tabindex="-1"
            type="button"
            class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            suiDialogClose
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
      <div sui-dialog-actions>
        <button
          type="button"
          class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
          suiDialogClose
        >
          Cancel
        </button>
        <button
          type="submit"
          class="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          [sui-dialog-close]="signupForm.value"
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
