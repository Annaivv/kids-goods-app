import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _snackBar = inject(MatSnackBar);
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(
    message: string,
    action: string = '',
    duration: number = 3000
  ): void {
    this._snackBar.open(message, action, {
      duration: duration,
      verticalPosition: this.verticalPosition,
    });
  }
}
