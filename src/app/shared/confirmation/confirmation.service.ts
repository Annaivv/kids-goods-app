import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from './confirmation.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  readonly dialog = inject(MatDialog);

  openConfirmationDialog(
    message: string,
    enterAnimationDuration: string = '0ms',
    exitAnimationDuration: string = '0ms'
  ) {
    return this.dialog.open(ConfirmationComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        message,
      },
    });
  }
}
