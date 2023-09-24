import { Dialog, DialogConfig } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Type, inject } from '@angular/core';
import { SuiDialogContainerComponent } from './sui-dialog-container.component';
import { SuiDialogRefService } from './sui-dialog-ref.service';

@Injectable({
  providedIn: 'root',
})
export class SuiDialogService {
  #cdkDialog = inject(Dialog);
  #cdkOverlay = inject(Overlay);
  #suiDialogRefCtor: Type<SuiDialogRefService<any>>;

  constructor() {
    this.#suiDialogRefCtor = SuiDialogRefService;
  }

  open<TComponent, TData = any, TResult = any>(
    component: ComponentType<TResult>,
    data?: TData,
    config?: DialogConfig<TData>
  ): SuiDialogRefService<TComponent, TResult> {
    let suiDialogRef: SuiDialogRefService<TComponent, TResult>;
    const cdkDialogRef = this.#cdkDialog.open<TComponent, TData, TResult>(
      component,
      {
        ...config,
        positionStrategy: this.#cdkOverlay.position().global().end(),
        scrollStrategy: this.#cdkOverlay.scrollStrategies.block(),
        container: SuiDialogContainerComponent,
        data,
        panelClass: ['h-full', 'pointer-events-auto', 'max-w-md', 'w-screen'],
        hasBackdrop: true,
        disableClose: true,
        closeOnOverlayDetachments: false,
        providers: (cdkDialogRef, cfg, container) => {
          suiDialogRef = new this.#suiDialogRefCtor(
            cdkDialogRef,
            cfg,
            container
          );
          return [
            {
              provide: SuiDialogRefService,
              useValue: suiDialogRef,
            },
            {
              provide: SuiDialogContainerComponent,
              useValue: container,
            },
          ];
        },
      }
    );

    (suiDialogRef! as { componentRef: ComponentRef<TResult> }).componentRef =
      cdkDialogRef.componentRef!;
    suiDialogRef!.componentInstance = cdkDialogRef.componentInstance!;

    return suiDialogRef!;
  }
}
