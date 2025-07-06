import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable()
export class CustomOverlayContainer extends OverlayContainer {
  override _createContainer(): void {
    super._createContainer();
    this._containerElement.classList.add('custom-snackbar-theme');
  }
}
