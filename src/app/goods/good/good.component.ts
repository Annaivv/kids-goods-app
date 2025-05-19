import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Good, NewGood } from '../interfaces/good.model';
import { GoodsService } from '../goods.service';
import { GoodsFirebaseService } from '../goodsFirebase.service';
import { MatDialog } from '@angular/material/dialog';
import { AddGoodDialogComponent } from '../add-good/add-good-dialog/add-good-dialog.component';

@Component({
  selector: 'app-good',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './good.component.html',
  styleUrl: './good.component.css',
})
export class GoodComponent {
  good = input.required<Good>();

  goodsService = inject(GoodsService);
  goodsFirebaseService = inject(GoodsFirebaseService);
  dialog = inject(MatDialog);

  removeGood(): void {
    this.goodsFirebaseService.removeGood(this.good().id).subscribe(() => {
      this.goodsService.removeGood(this.good().id);
    });
  }

  editGood(): void {
    const dialogRef = this.dialog.open(AddGoodDialogComponent, {
      width: '400px',
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
