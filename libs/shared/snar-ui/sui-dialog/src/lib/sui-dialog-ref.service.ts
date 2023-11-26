import { AnimationEvent } from '@angular/animations';
import { DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentRef, Injectable } from '@angular/core';
import { Observable, Subject, filter, take } from 'rxjs';
import { SuiDialogContainerComponent } from './sui-dialog-container.component';

@Injectable({
  providedIn: 'root',
})
export class SuiDialogRefService<TResult = any, TComponent = any> {
  componentRef?: ComponentRef<any>;
  componentInstance?: TComponent;
  private _beforeClose = new Subject<TResult | undefined>();
  beforeClosed(): Observable<TResult | undefined> {
    return this._beforeClose;
  }
  private _afterClosed = new Subject<void>();
  afterClosed(): Observable<TResult | undefined> {
    return this.dialogRef.closed;
  }
  constructor(
    private dialogRef: DialogRef<TResult, TComponent>,
    private config: DialogConfig<TComponent, DialogRef<TResult, TComponent>>,
    private container: SuiDialogContainerComponent
  ) {
    dialogRef.backdropClick.subscribe(() => {
      this.close();
    });
  }

  close(dialogResult?: TResult): void {
    if (!this.componentInstance) {
      return;
    }
    this.container.animationStateChanged
      .pipe(
        filter((event: AnimationEvent) => event.phaseName === 'start'),
        take(1)
      )
      .subscribe(() => {
        this._beforeClose.next(dialogResult);
        this._beforeClose.complete();
        this.dialogRef?.overlayRef.detachBackdrop();
      });

    // Listen for animation 'done' events
    this.container.animationStateChanged
      .pipe(
        filter(
          (event: AnimationEvent) =>
            event.phaseName === 'done' && event.toState === 'closed'
        ),
        take(1)
      )
      .subscribe(() => {
        this.dialogRef?.close(dialogResult);
        this._afterClosed.next();
        this._afterClosed.complete();

        // Make sure to also clear the reference to the
        // component instance to avoid memory leaks
        this.componentInstance = undefined;
      });
    this.container.startExitAnimation();
  }
}
