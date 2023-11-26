import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export function provideSnarUi(): EnvironmentProviders {
  return importProvidersFrom(DialogModule, OverlayModule);
}

export function provideSnarUiAnimations(): EnvironmentProviders {
  return importProvidersFrom(BrowserAnimationsModule);
}
