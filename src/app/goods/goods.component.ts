import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';

import { GoodsService } from './goods.service';
import { GoodsFirebaseService } from './goodsFirebase.service';
import { MatDialog } from '@angular/material/dialog';
import { AddGoodDialogComponent } from './add-good/add-good-dialog/add-good-dialog.component';
import { GoodComponent } from './good/good.component';

@Component({
  selector: 'app-goods',
  imports: [MatButtonModule, GoodComponent],
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.css',
})
export class GoodsComponent {
  goodsService = inject(GoodsService);
  goodsFirebaseService = inject(GoodsFirebaseService);
  goods = this.goodsService.goods;
  dialog = inject(MatDialog);

  constructor() {
    this.initializeGoods();
  }

  initializeGoods() {
    this.goodsFirebaseService
      .getAllGoods()
      .pipe(takeUntilDestroyed())
      .subscribe((goods) => {
        this.goodsService.goods.set(goods);
      });
  }

  openAddGoodDialog(): void {
    const dialogRef = this.dialog.open(AddGoodDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Result: ', result);
    });
  }
}
