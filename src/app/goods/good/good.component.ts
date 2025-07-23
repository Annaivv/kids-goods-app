import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { Good } from '../../interfaces/good.model';

import { GoodsService } from '../goods.service';
import { GoodsFirebaseService } from '../goodsFirebase.service';

import { AddGoodDialogComponent } from '../add-good/add-good-dialog/add-good-dialog.component';
import { NotificationService } from '../../shared/notification.service';
import { ConfirmationComponent } from '../../shared/confirmation/confirmation.component';

@Component({
  selector: 'app-good',
  imports: [MatIconModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './good.component.html',
  styleUrl: './good.component.css',
})
export class GoodComponent {
  good = input.required<Good>();

  goodsService = inject(GoodsService);
  goodsFirebaseService = inject(GoodsFirebaseService);
  dialog = inject(MatDialog);
  private notificationService = inject(NotificationService);

  removeGood(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '25rem',
      data: {
        message: `Are you sure you want to delete the good "${
          this.good().name
        }"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean | undefined) => {
      if (confirmed === true) {
        this.goodsFirebaseService.removeGood(this.good().id).subscribe({
          next: () => {
            this.goodsService.removeGood(this.good().id);
            this.notificationService.openSnackBar('Good deleted successfully');
          },
          error: () => {
            this.notificationService.openSnackBar(
              'Failed to delete good. Please try again.'
            );
          },
        });
      } else {
        console.log(
          '3. User cancelled deletion or dialog was dismissed. Good not deleted.'
        );
      }
    });
  }

  editGood(): void {
    const dialogRef = this.dialog.open(AddGoodDialogComponent, {
      width: '25rem',
      data: this.good(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Result: ', result);
      if (result) {
        this.goodsFirebaseService
          .updateGood(this.good().id, result)
          .subscribe(() => {
            this.goodsService.updateGood(this.good().id, result);
          });
      }
    });
    console.log('Good is edited:', this.good());
  }
}
